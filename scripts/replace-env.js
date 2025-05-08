const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../dist/mon-portfolio/browser/index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// Remplacer les variables d'environnement
content = content.replace(/\${([^}]+)}/g, (match, key) => {
  return process.env[key] || '';
});

fs.writeFileSync(indexPath, content); 