const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'upload', 'Battaryes', 'products_final.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

data.forEach((p, idx) => {
  const name = p.name.toLowerCase();
  const desc = (p.description || '').toLowerCase();
  
  if (name.includes('lead') || name.includes('acid') || name.includes('gel') || name.includes('tubular') || name.includes('graphene') || name.includes('acut')) {
    console.log(`[${idx+1}] Name: ${p.name}`);
    if (name.includes('lead') || name.includes('acid') || name.includes('gel') || name.includes('tubular')) {
      console.log(`    Looks like LEAD-ACID / GEL / TUBULAR`);
    }
    if (name.includes('graphene') || name.includes('acut')) {
      console.log(`    Looks like GRAPHENE / ACUT`);
    }
  }
});
