/**
 * Script de test pour la fonctionnalité d'envoi d'emails
 * 
 * Usage:
 * node test-email.js
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Charger les variables d'environnement
require('dotenv').config({ path: '.env.local' });

// Configuration
const EMAIL_USER = process.env.EMAIL_USER || 'emmanueldeko64@gmail.com';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || 'xcym ejub xsrl vsgb';

console.log('🔧 Configuration Email Test');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📧 Email User:', EMAIL_USER);
console.log('🔑 Password configured:', EMAIL_PASSWORD ? '✅ Oui' : '❌ Non');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Fonction pour charger un template
const loadTemplate = (templateName, variables = {}) => {
  try {
    const templatePath = path.join(__dirname, 'src', 'lib', 'email-templates', `${templateName}.html`);
    let template = fs.readFileSync(templatePath, 'utf8');
    
    Object.keys(variables).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      template = template.replace(regex, variables[key]);
    });
    
    return template;
  } catch (error) {
    console.error('❌ Erreur lors du chargement du template:', error.message);
    return null;
  }
};

// Créer le transporteur
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Test de connexion
async function testConnection() {
  console.log('🔌 Test de connexion SMTP...');
  try {
    await transporter.verify();
    console.log('✅ Connexion SMTP réussie!\n');
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion SMTP:', error.message);
    console.error('\n💡 Vérifiez:');
    console.error('   1. Que la validation en 2 étapes est activée sur Gmail');
    console.error('   2. Que vous utilisez un mot de passe d\'application (pas votre mot de passe principal)');
    console.error('   3. Que EMAIL_USER et EMAIL_PASSWORD sont corrects dans .env.local\n');
    return false;
  }
}

// Test d'envoi d'email
async function sendTestEmail() {
  console.log('📨 Envoi d\'un email de test...');
  
  const templateVariables = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test du système d\'email',
    message: 'Ceci est un message de test pour vérifier que le système d\'envoi d\'emails fonctionne correctement.',
    date: new Date().toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    year: new Date().getFullYear().toString()
  };

  const htmlContent = loadTemplate('contact-notification', templateVariables);
  
  if (!htmlContent) {
    console.error('❌ Impossible de charger le template');
    return false;
  }

  const mailOptions = {
    from: `"Portfolio Test" <${EMAIL_USER}>`,
    to: EMAIL_USER,
    subject: '🧪 Test du système d\'email - Portfolio Emmanuel Deko',
    html: htmlContent,
    text: `
Test du système d'email

De : Test User (test@example.com)
Sujet : Test du système d'email

Message :
Ceci est un message de test pour vérifier que le système d'envoi d'emails fonctionne correctement.

---
Date : ${templateVariables.date}
    `.trim()
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email de test envoyé avec succès!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📬 Destinataire:', mailOptions.to);
    console.log('\n💡 Vérifiez votre boîte de réception:', EMAIL_USER, '\n');
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error.message);
    return false;
  }
}

// Exécuter les tests
async function runTests() {
  console.log('🚀 Démarrage des tests d\'email\n');
  
  const connectionOk = await testConnection();
  if (!connectionOk) {
    process.exit(1);
  }
  
  const emailSent = await sendTestEmail();
  if (!emailSent) {
    process.exit(1);
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Tous les tests sont passés!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Lancer les tests
runTests().catch(error => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});
