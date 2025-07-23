#!/bin/bash

echo "🔄 Test du build Angular..."

# Nettoyer les anciens builds
rm -rf dist/
rm -rf node_modules/.cache/

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm ci

# Construire l'application
echo "🏗️ Construction de l'application..."
NODE_OPTIONS="--max_old_space_size=1024" npm run build

# Vérifier que le build existe
if [ -d "dist/mon-portfolio/browser" ]; then
    echo "✅ Build réussi!"
    echo "📁 Fichiers générés:"
    ls -la dist/mon-portfolio/browser/
else
    echo "❌ Échec du build!"
    exit 1
fi

# Test du Dockerfile
echo "🐳 Test du Dockerfile..."
docker build -t test-portfolio .

if [ $? -eq 0 ]; then
    echo "✅ Docker build réussi!"
else
    echo "❌ Échec du Docker build!"
    exit 1
fi

echo "🎉 Tous les tests sont passés!" 