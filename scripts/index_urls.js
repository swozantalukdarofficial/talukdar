const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const https = require("https");
const http = require("http");

// Configuration
const DEFAULT_DOMAIN = "https://evsolutionbd.com"; // User will update or pass as argument
const INDEXNOW_KEY = "7f77257068df4aa29be16cdeeeb31315";

// JWT signing helper for Google Service Account using native node crypto
function signJwt(payload, privateKey) {
  const header = { alg: "RS256", typ: "JWT" };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signatureInput);
  const signature = signer.sign(privateKey, "base64url");
  return `${signatureInput}.${signature}`;
}

// Request Helper
function makeRequest(urlStr, options, bodyData = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const client = url.protocol === "https:" ? https : http;
    const defaultPort = url.protocol === "https:" ? 443 : 80;

    const reqHeaders = { ...(options.headers || {}) };
    let bodyStr = null;
    if (bodyData) {
      bodyStr = typeof bodyData === "string" ? bodyData : JSON.stringify(bodyData);
      reqHeaders["Content-Length"] = Buffer.byteLength(bodyStr);
    }

    const reqOptions = {
      hostname: url.hostname,
      port: url.port || defaultPort,
      path: url.pathname + url.search,
      method: options.method || "GET",
      headers: reqHeaders,
    };

    const req = client.request(reqOptions, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data,
        });
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    if (bodyStr) {
      req.write(bodyStr);
    }
    req.end();
  });
}

// Get Google access token via Service Account JWT
async function getGoogleAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const jwt = signJwt(claim, serviceAccount.private_key);
  const body = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`;

  const response = await makeRequest("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }, body);

  if (response.statusCode !== 200) {
    throw new Error(`Google Auth failed: ${response.data}`);
  }

  const json = JSON.parse(response.data);
  return json.access_token;
}

// Fetch and parse Sitemap XML URLs
async function fetchSitemapUrls(domain) {
  console.log(`Fetching sitemap from: ${domain}/sitemap.xml...`);
  try {
    const res = await makeRequest(`${domain}/sitemap.xml`, {});
    if (res.statusCode !== 200) {
      throw new Error(`Failed to fetch sitemap: Status code ${res.statusCode}`);
    }

    // Match all <loc>...</loc> URLs
    const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
    const urls = [];
    let match;
    while ((match = locRegex.exec(res.data)) !== null) {
      urls.push(match[1].trim());
    }

    return urls;
  } catch (error) {
    console.error(`Sitemap fetch error: ${error.message}`);
    return [];
  }
}

// Google Indexing API submission
async function submitToGoogle(url, accessToken) {
  const body = {
    url: url,
    type: "URL_UPDATED",
  };

  const res = await makeRequest("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  }, body);

  return { url, status: res.statusCode, response: res.data };
}

// IndexNow Submission (Bing, Yandex, etc.)
async function submitToIndexNow(domainStr, urls) {
  const domain = new URL(domainStr).hostname;
  const body = {
    host: domain,
    key: INDEXNOW_KEY,
    keyLocation: `${domainStr}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  console.log("Submitting to IndexNow API (Bing)...");
  try {
    const res = await makeRequest("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }, body);

    console.log(`IndexNow Response: Status ${res.statusCode}`);
  } catch (err) {
    console.error(`IndexNow submission failed: ${err.message}`);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const domain = args[0] || DEFAULT_DOMAIN;

  const urls = await fetchSitemapUrls(domain);
  if (urls.length === 0) {
    console.log("No URLs found in the sitemap or failed to fetch. Exiting.");
    return;
  }

  console.log(`Found ${urls.length} URLs in the sitemap.`);

  // 1. Submit to IndexNow
  await submitToIndexNow(domain, urls);

  // 2. Submit to Google Indexing API if service account JSON exists
  const serviceAccountPath = path.join(__dirname, "..", "service_account.json");
  if (!fs.existsSync(serviceAccountPath)) {
    console.log("\n[Notice] 'service_account.json' not found in project root.");
    console.log("Google Indexing API submission skipped.");
    console.log("To enable Google Indexing, download the JSON key from Google Cloud Console and place it as 'service_account.json' in the root directory.");
    return;
  }

  console.log("\nAuthenticating with Google Indexing API...");
  try {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
    const accessToken = await getGoogleAccessToken(serviceAccount);

    console.log("Submitting URLs to Google Indexing API...");
    for (const url of urls) {
      const result = await submitToGoogle(url, accessToken);
      console.log(`Submitted: ${url} -> Status: ${result.status}`);
    }
    console.log("Google Indexing submission complete.");
  } catch (err) {
    console.error(`Google Indexing submission failed: ${err.message}`);
  }
}

main();
