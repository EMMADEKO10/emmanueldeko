import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Configuration du transporteur email avec SMTP Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env['EMAIL_USER'] || 'emmanueldeko64@gmail.com',
      pass: process.env['EMAIL_PASSWORD'] || 'xcym ejub xsrl vsgb' // Mot de passe d'application Gmail
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Fonction pour lire et remplacer les variables dans un template HTML
const loadEmailTemplate = (templateName: string, variables: Record<string, string> = {}): string => {
  try {
    const templatePath = path.join(process.cwd(), 'src', 'lib', 'email-templates', `${templateName}.html`);
    let template = fs.readFileSync(templatePath, 'utf8');
    
    // Remplacer les variables dans le template
    Object.keys(variables).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      template = template.replace(regex, variables[key]);
    });
    
    return template;
  } catch (error) {
    console.error('❌ Erreur lors du chargement du template:', error);
    throw error;
  }
};

// Fonction pour envoyer l'email
const sendContactEmail = async (formData: ContactFormData) => {
  const transporter = createTransporter();
  
  // Préparer les variables pour le template
  const templateVariables = {
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message.replace(/\n/g, '<br>'),
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
  
  // Charger le template HTML
  const htmlContent = loadEmailTemplate('contact-notification', templateVariables);
  
  const mailOptions = {
    from: `"Portfolio Emmanuel Deko" <${process.env['EMAIL_USER'] || 'emmanueldeko64@gmail.com'}>`,
    to: 'emmanueldeko64@gmail.com',
    replyTo: formData.email,
    subject: `📬 Nouveau message de ${formData.name} - ${formData.subject}`,
    html: htmlContent,
    // Version texte pour les clients qui ne supportent pas le HTML
    text: `
Nouveau message de contact

De : ${formData.name} (${formData.email})
Sujet : ${formData.subject}

Message :
${formData.message}

---
Date : ${templateVariables.date}
Envoyé depuis le formulaire de contact du portfolio
    `.trim()
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email envoyé avec succès:', info.messageId);
    console.log('📧 Destinataire:', mailOptions.to);
    console.log('📝 Sujet:', mailOptions.subject);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
};

// Fonction pour envoyer un email de confirmation à l'expéditeur
const sendConfirmationEmail = async (formData: ContactFormData) => {
  const transporter = createTransporter();
  
  // Préparer les variables pour le template de confirmation
  const templateVariables = {
    name: formData.name,
    subject: formData.subject,
    message: formData.message.replace(/\n/g, '<br>'),
    year: new Date().getFullYear().toString()
  };
  
  // Charger le template HTML de confirmation
  const htmlContent = loadEmailTemplate('contact-confirmation', templateVariables);
  
  const mailOptions = {
    from: `"Emmanuel Deko" <${process.env['EMAIL_USER'] || 'emmanueldeko64@gmail.com'}>`,
    to: formData.email,
    subject: '✅ Confirmation de réception de votre message',
    html: htmlContent,
    text: `
Bonjour ${formData.name},

Je vous confirme avoir bien reçu votre message concernant "${formData.subject}".

Je m'efforcerai de vous répondre dans les plus brefs délais, généralement sous 24-48 heures.

Récapitulatif de votre message :
${formData.message}

Cordialement,
Emmanuel Deko Wembolwa
Développeur Full Stack • Analyste de Données • Support IT
emmanueldeko64@gmail.com
    `.trim()
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email de confirmation envoyé à:', formData.email);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('⚠️ Erreur lors de l\'envoi de l\'email de confirmation:', error);
    // Ne pas bloquer si l'email de confirmation échoue
    return { success: false, error };
  }
};

// Handler pour la route API
const contactHandler = async (req: Request, res: Response) => {
  try {
    console.log('📨 Contact API request received');
    
    const { name, email, subject, message } = req.body;
    
    // Validation des données
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Tous les champs sont requis'
      });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Format d\'email invalide'
      });
    }

    // Envoi de l'email de notification à Emmanuel
    const notificationResult = await sendContactEmail({ name, email, subject, message });
    
    // Envoi de l'email de confirmation à l'expéditeur (en arrière-plan)
    sendConfirmationEmail({ name, email, subject, message }).catch(error => {
      console.error('⚠️ Échec de l\'envoi de la confirmation, mais le message principal a été envoyé:', error);
    });
    
    return res.json({
      success: true,
      message: 'Message envoyé avec succès ! Vous recevrez une confirmation par email.',
      messageId: notificationResult.messageId
    });

  } catch (error) {
    console.error('❌ Erreur dans contactHandler:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'envoi du message'
    });
  }
};

export default contactHandler; 