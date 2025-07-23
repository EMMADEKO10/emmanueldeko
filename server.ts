import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { readFileSync } from 'fs';
import bootstrap from './src/main.server';

// Configuration des variables d'environnement
import * as dotenv from 'dotenv';
dotenv.config();

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = readFileSync(join(serverDistFolder, 'index.server.html'), 'utf-8');

const app = express();
const commonEngine = new CommonEngine();

// Configuration pour la production
const PORT = Number(process.env['PORT']) || 30;
const HOST = '0.0.0.0';

console.log(`🚀 Starting Emmanuel's Portfolio Server...`);
console.log(`📦 Environment: ${process.env['NODE_ENV'] || 'development'}`);
console.log(`🤖 OpenAI configured: ${process.env['OPENAI_API_KEY'] ? 'Yes' : 'No'}`);
console.log(`🌐 Server will listen on ${HOST}:${PORT}`);

/**
 * API Routes pour le chatbot
 */
// Import de l'API du chatbot
import chatHandler from './src/api/chat.js';

// Route API pour le chatbot
app.post('/api/chat', (req, res) => {
  console.log('📨 Chat API request received');
  chatHandler(req, res);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    openai: process.env['OPENAI_API_KEY'] ? 'configured' : 'not_configured',
    port: PORT
  });
});

/**
 * Servir les fichiers statiques depuis /browser
 */
app.use(express.static(browserDistFolder, {
  maxAge: '1y',
  index: false,
}));

/**
 * Middleware pour parser le JSON
 */
app.use(express.json({ limit: '10mb' }));

/**
 * Gérer toutes les autres routes avec Angular Universal SSR
 */
app.get('**', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});

/**
 * Démarrer le server
 */
app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on http://${HOST}:${PORT}`);
  console.log(`🤖 Chatbot API available at http://${HOST}:${PORT}/api/chat`);
  console.log(`❤️ Health check at http://${HOST}:${PORT}/health`);
});
