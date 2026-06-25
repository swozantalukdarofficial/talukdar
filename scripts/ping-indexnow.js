import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const host = "webestone.com";
const apiKey = "98b50e2ddc9943efb387052637738f61";
const keyLocation = `https://${host}/${apiKey}.txt`;

async function ping() {
    try {
        const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
        if (!fs.existsSync(sitemapPath)) {
            console.error("sitemap.xml not found at path:", sitemapPath);
            process.exit(1);
        }

        const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
        
        // Extract all <loc> URLs using regex
        const locRegex = /<loc>(https:\/\/webestone\.com[^<]+)<\/loc>/g;
        const urlList = [];
        let match;
        while ((match = locRegex.exec(sitemapContent)) !== null) {
            urlList.push(match[1]);
        }

        if (urlList.length === 0) {
            console.log("No URLs found in sitemap.xml to ping.");
            return;
        }

        console.log(`Found ${urlList.length} URLs in sitemap.xml. Submitting to IndexNow...`);

        const payload = {
            host,
            key: apiKey,
            keyLocation,
            urlList
        };

        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("Success! IndexNow has been successfully notified.");
        } else {
            const errorText = await response.text();
            console.error(`IndexNow submission failed. Status: ${response.status}. Error: ${errorText}`);
        }
    } catch (error) {
        console.error("An error occurred during IndexNow ping:", error);
    }
}

ping();
