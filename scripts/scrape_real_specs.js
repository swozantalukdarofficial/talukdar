/**
 * Scrape Real Specs from BikeBD
 * ─────────────────────────────
 * Reads each Spec URL from the bulk JSON, fetches the actual
 * specification page from bikebd.com, parses the spec table,
 * and updates the corresponding product in Supabase.
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

// Simple HTML fetch (no external deps needed)
const https = require('https');
const http = require('http');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchPage(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Parse spec table from BikeBD HTML.
 * BikeBD spec pages typically have tables with rows like:
 * <tr><td>Motor Power</td><td>1500W</td></tr>
 * or similar structures with th/td pairs.
 */
function parseSpecs(html) {
  const specs = {};

  // Method 1: Look for table rows with two cells (most common bikebd format)
  // Pattern: <tr...><td...>Key</td><td...>Value</td></tr>
  const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let trMatch;

  while ((trMatch = trRegex.exec(html)) !== null) {
    const rowHtml = trMatch[1];
    // Extract all td/th content
    const cellRegex = /<(?:td|th)[^>]*>([\s\S]*?)<\/(?:td|th)>/gi;
    const cells = [];
    let cellMatch;
    while ((cellMatch = cellRegex.exec(rowHtml)) !== null) {
      // Strip HTML tags and decode entities
      let text = cellMatch[1]
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .trim();
      if (text) cells.push(text);
    }

    if (cells.length >= 2) {
      const key = cells[0].replace(/[:：]/g, '').trim();
      const value = cells[1].trim();
      // Skip empty, header-like, or junk entries
      if (key && value && key.length < 60 && value.length < 200
        && !key.toLowerCase().includes('specification')
        && key.toLowerCase() !== 'feature'
        && key.toLowerCase() !== 'features') {
        specs[key] = value;
      }
    }
  }

  // Method 2: Look for dl/dt/dd pairs (alternative format)
  if (Object.keys(specs).length === 0) {
    const dtRegex = /<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/gi;
    let dtMatch;
    while ((dtMatch = dtRegex.exec(html)) !== null) {
      const key = dtMatch[1].replace(/<[^>]+>/g, '').replace(/[:：]/g, '').trim();
      const value = dtMatch[2].replace(/<[^>]+>/g, '').trim();
      if (key && value && key.length < 60) {
        specs[key] = value;
      }
    }
  }

  // Method 3: Look for div-based spec lists (another bikebd variant)
  if (Object.keys(specs).length === 0) {
    // Pattern: <span class="...">Key</span> ... <span class="...">Value</span>
    const specPairRegex = /<div[^>]*class="[^"]*spec[^"]*"[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>[\s\S]*?<\/div>/gi;
    let spMatch;
    while ((spMatch = specPairRegex.exec(html)) !== null) {
      const key = spMatch[1].replace(/<[^>]+>/g, '').replace(/[:：]/g, '').trim();
      const value = spMatch[2].replace(/<[^>]+>/g, '').trim();
      if (key && value && key.length < 60) {
        specs[key] = value;
      }
    }
  }

  return specs;
}

/**
 * Also try to extract description text from the page
 */
function parseDescription(html) {
  // Look for meta description
  const metaMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (metaMatch && metaMatch[1].length > 50) {
    return metaMatch[1];
  }

  // Look for OG description
  const ogMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
  if (ogMatch && ogMatch[1].length > 50) {
    return ogMatch[1];
  }

  return null;
}

// Slugify helper (same as import script)
function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

async function main() {
  console.log('=== BikeBD Real Specs Scraper ===\n');

  // 1. Read the bulk JSON
  const jsonPath = path.join(__dirname, '..', 'upload', 'bikebd_ev_scooters_bulk_import.json');
  const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  console.log('Total records in JSON:', rawData.length);

  // 2. Fetch all ebike products from Supabase
  const { data: allProducts, error } = await supabase
    .from('products')
    .select('id, name, slug, price, specs, description, category')
    .eq('category', 'ebike');

  if (error) { console.error('DB Error:', error); return; }
  console.log('Total ebike products in DB:', allProducts.length);

  // 3. For each JSON record, scrape the spec URL and match to DB product
  let updated = 0;
  let failed = 0;
  let skipped = 0;
  const scrapedData = [];

  for (let i = 0; i < rawData.length; i++) {
    const record = rawData[i];
    const specUrl = record['Spec URL'];
    const productUrl = record['URL'];
    const brand = record.Brand || '';

    if (!specUrl) { skipped++; continue; }

    // Extract the proper product name from the URL slug
    const urlParts = (productUrl || specUrl).split('/');
    const urlSlug = urlParts[urlParts.length - 1] === 'specifications'
      ? urlParts[urlParts.length - 2]
      : urlParts[urlParts.length - 1];

    console.log(`[${i + 1}/${rawData.length}] Scraping: ${urlSlug}...`);

    try {
      // Try spec page first, fallback to product page
      let html = await fetchPage(specUrl);
      let specs = parseSpecs(html);

      // If spec page didn't have table data, try the main product page
      if (Object.keys(specs).length < 3 && productUrl) {
        html = await fetchPage(productUrl);
        specs = parseSpecs(html);
      }

      if (Object.keys(specs).length < 2) {
        console.log(`  ⚠ No specs found on page`);
        skipped++;
        continue;
      }

      // Add brand
      if (brand && !specs.Brand) {
        specs.Brand = brand;
      }

      // Clean up junk keys
      const cleanSpecs = {};
      const junkPatterns = ['best lube', 'lube for', 'launched', 'url', 'image', 'price', 'review', 'rating'];
      Object.entries(specs).forEach(([k, v]) => {
        const lk = k.toLowerCase();
        if (!junkPatterns.some(j => lk.includes(j)) && v !== 'N/A' && v !== '-') {
          cleanSpecs[k] = v;
        }
      });

      // Try to get description
      const desc = parseDescription(html);

      scrapedData.push({
        urlSlug,
        brand,
        specs: cleanSpecs,
        description: desc,
        price: record.Price_Cleaned ? parseInt(record.Price_Cleaned) : null
      });

      console.log(`  ✓ Found ${Object.keys(cleanSpecs).length} specs: ${Object.keys(cleanSpecs).join(', ')}`);

      // Small delay to be nice to the server
      await new Promise(r => setTimeout(r, 300));

    } catch (err) {
      console.log(`  ✗ Error: ${err.message}`);
      failed++;
    }
  }

  // 4. Save scraped data to file for review
  const outputPath = path.join(__dirname, '..', 'upload', 'scraped_specs.json');
  fs.writeFileSync(outputPath, JSON.stringify(scrapedData, null, 2));
  console.log(`\nSaved ${scrapedData.length} scraped records to ${outputPath}`);

  // 5. Now match and update Supabase products
  console.log('\n--- Updating Supabase products ---');
  let dbUpdated = 0;

  for (const scraped of scrapedData) {
    if (Object.keys(scraped.specs).length < 3) continue;

    // Match by slug similarity
    const matchSlug = scraped.urlSlug.toLowerCase().replace(/-/g, '');
    const product = allProducts.find(p => {
      const dbSlug = (p.slug || '').toLowerCase().replace(/-/g, '');
      return dbSlug.includes(matchSlug) || matchSlug.includes(dbSlug);
    });

    // Also try matching by brand + similar name
    const productByBrand = !product ? allProducts.find(p => {
      const pBrand = (p.specs?.Brand || '').toLowerCase();
      const sBrand = scraped.brand.toLowerCase();
      if (pBrand !== sBrand) return false;
      // Check if slug words overlap
      const slugWords = scraped.urlSlug.split('-');
      const nameWords = p.name.toLowerCase().split(/[\s-]+/);
      const overlap = slugWords.filter(w => w.length > 2 && nameWords.some(nw => nw.includes(w)));
      return overlap.length >= 2;
    }) : null;

    const target = product || productByBrand;

    if (!target) {
      continue;
    }

    // Merge: scraped specs take priority, but keep existing Subcategory, Colors
    const mergedSpecs = { ...scraped.specs };
    if (target.specs?.Subcategory) mergedSpecs.Subcategory = target.specs.Subcategory;
    if (target.specs?.Colors) mergedSpecs.Colors = target.specs.Colors;

    const updatePayload = { specs: mergedSpecs };

    // Update description only if scraped one is better
    if (scraped.description && scraped.description.length > (target.description || '').length * 0.5) {
      // Don't overwrite a good existing description
    }

    const { error: updateErr } = await supabase
      .from('products')
      .update(updatePayload)
      .eq('id', target.id);

    if (updateErr) {
      console.log(`  ✗ DB Update failed for ${target.name}: ${updateErr.message}`);
    } else {
      console.log(`  ✓ Updated: ${target.name} ← ${Object.keys(mergedSpecs).length} real specs`);
      dbUpdated++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`  Scraped from bikebd: ${scrapedData.length}`);
  console.log(`  Updated in Supabase: ${dbUpdated}`);
  console.log(`  Skipped (no data): ${skipped}`);
  console.log(`  Failed (errors): ${failed}`);
}

main().catch(console.error);
