const fs = require('fs');
const path = require('path');
const https = require('https');

// 1. Parse .env file
const envPath = path.join(__dirname, '../.env');
if (!fs.existsSync(envPath)) {
	console.error("Error: .env file not found at " + envPath);
	process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
	const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
	if (match) {
		let key = match[1];
		let value = match[2] || '';
		if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
		if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
		env[key] = value.trim();
	}
});

const cloudName = env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = env.VITE_CLOUDINARY_UPLOAD_PRESET;

if (!cloudName || !uploadPreset) {
	console.error("Error: Cloudinary credentials (VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET) are not defined in .env file");
	process.exit(1);
}

console.log("Cloud Name:", cloudName);
console.log("Upload Preset:", uploadPreset);

// Helper to make HTTPS POST request to Cloudinary
function uploadBase64(base64Data, filename) {
	return new Promise((resolve, reject) => {
		const ext = path.extname(filename).toLowerCase().replace('.', '');
		const mimeType = ext === 'svg' ? 'image/svg+xml' : `image/${ext}`;
		const filePayload = `data:${mimeType};base64,${base64Data}`;

		const postData = JSON.stringify({
			file: filePayload,
			upload_preset: uploadPreset
		});

		const options = {
			hostname: 'api.cloudinary.com',
			port: 443,
			path: `/v1_1/${cloudName}/image/upload`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(postData)
			}
		};

		const req = https.request(options, (res) => {
			let data = '';
			res.on('data', (chunk) => {
				data += chunk;
			});
			res.on('end', () => {
				try {
					const json = JSON.parse(data);
					if (json.secure_url) {
						resolve(json.secure_url);
					} else {
						reject(new Error(json.error ? json.error.message : 'Unknown Cloudinary error'));
					}
				} catch (e) {
					reject(e);
				}
			});
		});

		req.on('error', (e) => {
			reject(e);
		});

		req.write(postData);
		req.end();
	});
}

// Scans directories and uploads images
async function run() {
	const mappings = {};
	const publicDir = path.join(__dirname, '../public');
	const assetsDir = path.join(__dirname, '../src/assets');

	// 1. Files from public directory (only .webp for optimization)
	const publicFiles = [
		'digital-marketing-guide.webp',
		'hero-thumbnail.webp',
		'motion_hero.webp',
		'motion_services.webp',
		'ppc_cta.webp',
		'seo-guide-blog.webp',
		'shopify_seo_hero.webp',
		'top-10-digital-marketing-agency-in-bangladesh.webp',
		'video_commercial.webp',
		'video_corporate.webp',
		'video_editing_hero.webp',
		'video_post.webp',
		'video_process.webp',
		'video_reels.webp',
		'web_dev_hero.webp',
		'wordpress_hero.webp',
		'favicon.webp'
	];

	// 2. Files from src/assets directory
	const assetFiles = [
		'Webestone-Logo.webp',
		'ai-brain.webp',
		'ai-letters.webp',
		'ai-robot.webp',
		'circuit-board.webp',
		'seo-dashboard.webp',
		'seo-guide-blog.webp'
	];

	console.log("Starting uploads to Cloudinary...");

	// Upload public files
	for (const filename of publicFiles) {
		const filePath = path.join(publicDir, filename);
		if (fs.existsSync(filePath)) {
			try {
				console.log(`Uploading public/${filename}...`);
				const base64 = fs.readFileSync(filePath, { encoding: 'base64' });
				const url = await uploadBase64(base64, filename);
				console.log(`Uploaded! URL: ${url}`);
				// Map both absolute reference and simple filename references
				mappings[`/${filename}`] = url;
				mappings[filename] = url;
			} catch (e) {
				console.error(`Failed to upload ${filename}:`, e.message);
			}
		} else {
			console.warn(`File public/${filename} not found.`);
		}
	}

	// Upload asset files
	for (const filename of assetFiles) {
		const filePath = path.join(assetsDir, filename);
		if (fs.existsSync(filePath)) {
			try {
				console.log(`Uploading src/assets/${filename}...`);
				const base64 = fs.readFileSync(filePath, { encoding: 'base64' });
				const url = await uploadBase64(base64, filename);
				console.log(`Uploaded! URL: ${url}`);
				mappings[`src/assets/${filename}`] = url;
				mappings[`/src/assets/${filename}`] = url;
				mappings[filename] = url;
			} catch (e) {
				console.error(`Failed to upload ${filename}:`, e.message);
			}
		} else {
			console.warn(`File src/assets/${filename} not found.`);
		}
	}

	// Save mapping file
	const mappingsPath = path.join(__dirname, '../src/data/cloudinary-mappings.json');
	fs.writeFileSync(mappingsPath, JSON.stringify(mappings, null, 2), 'utf8');
	console.log(`Saved mappings to ${mappingsPath}`);

	// 3. Automatically replace references in local JSON files
	const dataDir = path.join(__dirname, '../src/data');
	const jsonFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== 'cloudinary-mappings.json');

	console.log("Updating local JSON configuration files with Cloudinary URLs...");
	for (const jsonFile of jsonFiles) {
		const filePath = path.join(dataDir, jsonFile);
		let content = fs.readFileSync(filePath, 'utf8');
		let updated = false;

		// Perform replacements based on mapping keys
		for (const [localPath, cloudinaryUrl] of Object.entries(mappings)) {
			// Only replace exact matches wrapped in quotes or separators to avoid substring collision
			const target = `"${localPath}"`;
			const replacement = `"${cloudinaryUrl}"`;
			if (content.includes(target)) {
				content = content.split(target).join(replacement);
				updated = true;
			}
		}

		if (updated) {
			fs.writeFileSync(filePath, content, 'utf8');
			console.log(`Updated JSON file: ${jsonFile}`);
		}
	}

	console.log("Cloudinary image upload and reference update completed successfully! 🚀");
}

run();
