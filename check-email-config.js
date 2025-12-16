#!/usr/bin/env node

/**
 * Vérification rapide de la configuration email
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Vérification de la configuration Email\n');
console.log('═'.repeat(50));

let allOk = true;

// 1. Vérifier .env.local
console.log('\n📄 Vérification de .env.local...');
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('   ✅ Fichier .env.local trouvé');
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  if (envContent.includes('EMAIL_USER=')) {
    console.log('   ✅ EMAIL_USER configuré');
  } else {
    console.log('   ❌ EMAIL_USER manquant');
    allOk = false;
  }
  
  if (envContent.includes('EMAIL_PASSWORD=')) {
    console.log('   ✅ EMAIL_PASSWORD configuré');
  } else {
    console.log('   ❌ EMAIL_PASSWORD manquant');
    allOk = false;
  }
} else {
  console.log('   ❌ Fichier .env.local non trouvé');
  console.log('   💡 Créez-le en copiant .env.example');
  allOk = false;
}

// 2. Vérifier les templates
console.log('\n📧 Vérification des templates email...');
const templatesDir = path.join(__dirname, 'src', 'lib', 'email-templates');

if (fs.existsSync(templatesDir)) {
  console.log('   ✅ Dossier email-templates trouvé');
  
  const notificationTemplate = path.join(templatesDir, 'contact-notification.html');
  if (fs.existsSync(notificationTemplate)) {
    console.log('   ✅ contact-notification.html présent');
  } else {
    console.log('   ❌ contact-notification.html manquant');
    allOk = false;
  }
  
  const confirmationTemplate = path.join(templatesDir, 'contact-confirmation.html');
  if (fs.existsSync(confirmationTemplate)) {
    console.log('   ✅ contact-confirmation.html présent');
  } else {
    console.log('   ❌ contact-confirmation.html manquant');
    allOk = false;
  }
} else {
  console.log('   ❌ Dossier email-templates non trouvé');
  allOk = false;
}

// 3. Vérifier les dépendances
console.log('\n📦 Vérification des dépendances...');
const packageJson = require('./package.json');

if (packageJson.dependencies.nodemailer) {
  console.log('   ✅ nodemailer installé:', packageJson.dependencies.nodemailer);
} else {
  console.log('   ❌ nodemailer non installé');
  console.log('   💡 Exécutez: npm install nodemailer');
  allOk = false;
}

if (packageJson.dependencies.dotenv) {
  console.log('   ✅ dotenv installé:', packageJson.dependencies.dotenv);
} else {
  console.log('   ❌ dotenv non installé');
  console.log('   💡 Exécutez: npm install dotenv');
  allOk = false;
}

// 4. Vérifier le fichier email.ts
console.log('\n📝 Vérification du fichier email.ts...');
const emailTsPath = path.join(__dirname, 'src', 'api', 'email.ts');
if (fs.existsSync(emailTsPath)) {
  console.log('   ✅ src/api/email.ts trouvé');
  
  const emailContent = fs.readFileSync(emailTsPath, 'utf8');
  
  if (emailContent.includes('loadEmailTemplate')) {
    console.log('   ✅ Fonction loadEmailTemplate présente');
  } else {
    console.log('   ⚠️  Fonction loadEmailTemplate manquante');
  }
  
  if (emailContent.includes('sendContactEmail')) {
    console.log('   ✅ Fonction sendContactEmail présente');
  } else {
    console.log('   ❌ Fonction sendContactEmail manquante');
    allOk = false;
  }
  
  if (emailContent.includes('sendConfirmationEmail')) {
    console.log('   ✅ Fonction sendConfirmationEmail présente');
  } else {
    console.log('   ⚠️  Fonction sendConfirmationEmail manquante (optionnel)');
  }
} else {
  console.log('   ❌ src/api/email.ts non trouvé');
  allOk = false;
}

// Résumé
console.log('\n' + '═'.repeat(50));
if (allOk) {
  console.log('\n✅ TOUT EST PRÊT ! 🎉\n');
  console.log('Prochaine étape : Testez avec "npm run test:email"\n');
} else {
  console.log('\n❌ Configuration incomplète\n');
  console.log('Consultez QUICK_START_EMAIL.md pour plus d\'infos\n');
  process.exit(1);
}
