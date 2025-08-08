import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Configuration du transporteur email
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env['EMAIL_USER'] || 'emmanueldeko64@gmail.com',
      pass: process.env['EMAIL_PASSWORD'] // Mot de passe d'application Gmail
    }
  });
};

// Fonction pour envoyer l'email
const sendContactEmail = async (formData: ContactFormData) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env['EMAIL_USER'] || 'emmanueldeko64@gmail.com',
    to: 'emmanueldeko64@gmail.com',
    subject: `Nouveau message de contact - ${formData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          Nouveau message de contact
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">Détails du contact :</h3>
          <p><strong>Nom :</strong> ${formData.name}</p>
          <p><strong>Email :</strong> ${formData.email}</p>
          <p><strong>Sujet :</strong> ${formData.subject}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h3 style="color: #1e293b; margin-top: 0;">Message :</h3>
          <p style="line-height: 1.6; color: #374151;">${formData.message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #6b7280; font-size: 14px;">
          <p>Ce message a été envoyé depuis le formulaire de contact de votre portfolio.</p>
          <p>Date d'envoi : ${new Date().toLocaleString('fr-FR')}</p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email envoyé avec succès:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    throw error;
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

    // Envoi de l'email
    const result = await sendContactEmail({ name, email, subject, message });
    
    return res.json({
      success: true,
      message: 'Message envoyé avec succès',
      messageId: result.messageId
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