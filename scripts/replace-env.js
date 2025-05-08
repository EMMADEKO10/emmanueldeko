import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const indexPath = join(__dirname, '../dist/mon-portfolio/browser/index.html');
let content = readFileSync(indexPath, 'utf8');

// Remplacer les variables d'environnement
content = content.replace(/\${([^}]+)}/g, (match, key) => {
  return process.env[key] || '';
});

writeFileSync(indexPath, content); 