# 🚀 Portfolio d'Emmanuel Deko

Un portfolio moderne et interactif développé avec Angular 18, présentant les compétences et projets d'Emmanuel Deko, développeur fullstack passionné.

## ✨ Fonctionnalités

- 📱 **Design Responsive** : Interface moderne adaptée à tous les écrans
- ⚡ **Angular SSR** : Rendu côté serveur pour de meilleures performances SEO
- 🤖 **Chatbot IA Intelligent** : Assistant personnel avec OpenAI GPT-3.5-turbo
- 🎨 **Animations Fluides** : Transitions et micro-interactions élégantes
- 🌐 **Multilingue** : Support français et anglais
- 🐳 **Docker Ready** : Déploiement containerisé avec Nginx
- 📊 **Analytics** : Suivi des interactions et performances

## 🤖 Configuration du Chatbot IA

### **Intelligence Artificielle OpenAI**

Le chatbot utilise GPT-3.5-turbo d'OpenAI pour des réponses dynamiques et contextuelles.

#### **1. Obtenir une Clé API OpenAI :**
```bash
# Rendez-vous sur https://platform.openai.com/api-keys
# Créez une nouvelle clé API
# Copiez la clé (elle commence par sk-...)
```

#### **2. Configuration Locale :**
```bash
# Créer le fichier .env à la racine
cp .env.example .env

# Éditer et ajouter votre clé
OPENAI_API_KEY=sk-votre_cle_openai_ici
```

#### **3. Configuration Coolify/Production :**
```bash
# Dans Coolify, aller dans Environment Variables
# Ajouter :
OPENAI_API_KEY=sk-votre_cle_openai_ici
```

### **Fonctionnalités du Chatbot :**

#### **🧠 Intelligence Multi-Niveaux :**
1. **OpenAI GPT-3.5** (priorité 1) : Réponses dynamiques et contextuelles
2. **Analyse Sémantique** (priorité 2) : Réponses prédéfinies intelligentes  
3. **Fallback Robuste** (priorité 3) : Réponses d'urgence

#### **🎯 Expertise Spécialisée :**
- Connaissances approfondies sur Emmanuel et ses projets
- Détails techniques sur Diasporium et le système de bourses RDC
- Recommandations de collaboration et contact professionnel
- Support multilingue (français/anglais)

#### **⚡ Fonctionnalités Techniques :**
```typescript
// Types de réponses supportés
- 'openai': Réponse IA OpenAI GPT-3.5
- 'predefined': Analyse sémantique avec réponses prédéfinies
- 'frontend_fallback': Fallback côté client
- 'error_fallback': Fallback en cas d'erreur serveur
```

#### **🔍 Questions Supportées :**
```bash
👤 "Qui est Emmanuel deko ?"
💻 "Quelles sont ses compétences ?"
🚀 "Parle-moi de ses projets"
🌍 "Qu'est-ce que Diasporium ?"
📧 "Comment le contacter ?"
⚡ "Son expérience professionnelle ?"
```

## 🛠️ Installation et Développement

### **Prérequis :**
- Node.js 18+
- npm ou yarn
- Docker (optionnel)
- Clé API OpenAI (optionnel mais recommandé)

### **Installation :**
```bash
# Cloner le repository
git clone https://github.com/EMMADEKO10/mon-portfolio.git
cd mon-portfolio

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec votre clé OpenAI

# Lancer en développement
npm start
```

### **Build de Production :**
```bash
# Build optimisé
npm run build

# Test local avec serveur de production
npm run serve:ssr:mon-portfolio
```

## 🐳 Déploiement Docker

### **Build et Run Local :**
```bash
# Build de l'image
docker build -t mon-portfolio .

# Lancer le conteneur
docker run -p 30:30 -e OPENAI_API_KEY=votre_cle_ici mon-portfolio
```

### **Déploiement Coolify :**
```bash
# Dans Coolify :
# 1. Source: GitHub repository
# 2. Branch: main  
# 3. Port: 30
# 4. Environment Variables:
#    OPENAI_API_KEY=sk-votre_cle_openai_ici
```

## 📊 Monitoring et Debug

### **Logs du Chatbot :**
```bash
# En développement, vérifiez la console :
🚀 Sending to API (OpenAI: enabled): message
🤖 Using OpenAI GPT for intelligent response...
✅ OpenAI response generated successfully
🧠 Response source: openai (Réponse IA OpenAI)
```

### **Test de l'API :**
```bash
# Test direct de l'endpoint
curl -X POST http://localhost:4200/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Qui est Emmanuel deko ?"}'
```

## 🌟 Projets Présentés

### **🌍 Diasporium**
- **Technologies :** NextJS, NodeJS, WebSocket, Firebase
- **Description :** Plateforme complète pour la diaspora congolaise
- **URL :** [https://diasporium.vercel.app](https://diasporium.vercel.app)

### **🎓 Système de Bourses RDC**
- **Technologies :** WordPress, PHP, MySQL
- **Description :** Gestion des bourses gouvernementales
- **URL :** [https://celbe-rdc.cd](https://celbe-rdc.cd)

## 🎨 Stack Technique

### **Frontend :**
- Angular 18 avec SSR
- TypeScript, HTML5, CSS3
- Tailwind CSS pour le styling
- Animations Angular

### **Backend :**
- Node.js avec Express
- API RESTful
- Intégration OpenAI GPT-3.5

### **DevOps :**
- Docker avec multi-stage builds
- Nginx pour le serving
- CI/CD avec Git
- Déploiement Coolify

## 👨‍💻 À Propos d'Emmanuel

Emmanuel Deko est un développeur fullstack passionné avec plus de 5 années d'expérience dans le développement web moderne. Il se spécialise dans la création d'applications complètes et performantes, combinant expertise technique et vision créative.

### **Compétences Clés :**
- **Frontend :** Angular, React, NextJS, TypeScript
- **Backend :** NodeJS, Express, Python
- **Bases de données :** MongoDB, MySQL, PostgreSQL, Firebase
- **DevOps :** Docker, Git, CI/CD, Cloud deployment

### **Contact :**
- **GitHub :** [https://github.com/EMMADEKO10](https://github.com/EMMADEKO10)
- **Portfolio :** [https://emmanueldeko.com](https://emmanueldeko.com)
- **Email :** Via le formulaire de contact du site

## 📄 License

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

💡 **Développé avec passion par Emmanuel Deko** 🚀
