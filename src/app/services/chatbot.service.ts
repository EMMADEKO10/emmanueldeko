import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  response: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private readonly apiUrl = '/api/chat'; // URL du backend

  // Informations sur Emmanuel pour le contexte du chatbot
  private readonly emmanuelContext = `
    Emmanuel Deko est un développeur fullstack passionné avec plusieurs années d'expérience.
    
    COMPÉTENCES TECHNIQUES:
    - Frontend: Angular, React, NextJS, TypeScript, HTML5, CSS3, Tailwind CSS
    - Backend: NodeJS, Express, Python, REST API, WebSocket
    - Base de données: MongoDB, MySQL, PostgreSQL, Firebase
    - DevOps: Docker, Git, CI/CD
    - Cloud: Vercel, Hostinger, Coolify
    
    PROJETS PRINCIPAUX:
    1. Diasporium - Plateforme complète front/back-end pour l'intégration et l'accompagnement de la diaspora au Congo
       - Technologies: NextJS, NodeJS, WebSocketIO, Cloudinary, Firebase
       - URL: https://diasporium.vercel.app
    
    2. Système de gestion des bourses - Application pour la cellule interministérielle de gestion des bourses en RDC
       - Technologies: WordPress
       - URL: https://celbe-rdc.cd
    
    FORMATION ET EXPÉRIENCE:
    - Développeur fullstack avec expertise en technologies modernes
    - Passionné par l'innovation et les nouvelles technologies
    - Expérience en développement d'applications web complètes
    - Maîtrise des bonnes pratiques de développement
    
    CONTACT:
    - GitHub: https://github.com/EMMADEKO10
    - Portfolio: https://www.emmanueldeko.com
  `;

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<ChatResponse> {
    const body = {
      message: message,
      context: this.emmanuelContext
    };
    
    return this.http.post<ChatResponse>(this.apiUrl, body);
  }

  // Version de fallback avec réponses prédéfinies si l'API n'est pas disponible
  getFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase().trim();
    console.log('Frontend fallback analyzing:', lowerMessage);
    
    // Questions sur Emmanuel personnellement
    if (lowerMessage.includes('qui est') || lowerMessage.includes('qui') || lowerMessage.includes('emmanuel') || 
        lowerMessage.includes('deko') || lowerMessage.includes('présent') || lowerMessage.includes('about') || 
        lowerMessage.includes('développeur') || lowerMessage.includes('personne')) {
      console.log('Frontend detected: About Emmanuel');
      return "Emmanuel Deko est un développeur fullstack passionné ! 👨‍💻 Il a plus de 5 années d'expérience dans le développement web moderne, avec une expertise particulière en Angular, React, et NodeJS. Il est très orienté innovation et toujours à l'affût des nouvelles technologies.";
    }
    
    // Compétences et technologies
    if (lowerMessage.includes('compétence') || lowerMessage.includes('competence') || lowerMessage.includes('skill') || 
        lowerMessage.includes('technologie') || lowerMessage.includes('stack') || lowerMessage.includes('maîtrise') || 
        lowerMessage.includes('sait') || lowerMessage.includes('peut') || lowerMessage.includes('capable') || 
        lowerMessage.includes('programming') || lowerMessage.includes('développement') || lowerMessage.includes('language')) {
      console.log('Frontend detected: Skills/Technologies');
      return "Emmanuel maîtrise un large éventail de technologies modernes ! 💻 Frontend : Angular, React, NextJS, TypeScript, HTML5, CSS3, Tailwind CSS. Backend : NodeJS, Express, Python, REST API, WebSocket. DevOps : Docker, Git, CI/CD. Bases de données : MongoDB, MySQL, PostgreSQL, Firebase.";
    }
    
    // Projets et réalisations
    if (lowerMessage.includes('projet') || lowerMessage.includes('réalisation') || lowerMessage.includes('portfolio') || 
        lowerMessage.includes('travail') || lowerMessage.includes('créé') || lowerMessage.includes('développé') || 
        lowerMessage.includes('fait') || lowerMessage.includes('construit') || lowerMessage.includes('application')) {
      console.log('Frontend detected: Projects');
      return "Emmanuel a réalisé des projets impressionnants ! 🌟 Son projet phare est Diasporium, une plateforme complète pour la diaspora congolaise (NextJS, NodeJS, WebSocket, Firebase) sur https://diasporium.vercel.app. Il a aussi créé un système de gestion des bourses pour la RDC.";
    }
    
    // Expérience et parcours
    if (lowerMessage.includes('expérience') || lowerMessage.includes('parcours') || lowerMessage.includes('carrière') || 
        lowerMessage.includes('profil') || lowerMessage.includes('background') || lowerMessage.includes('formation')) {
      console.log('Frontend detected: Experience');
      return "Emmanuel a plus de 5 années d'expérience en développement web ! 📈 Il a une approche moderne et maîtrise les bonnes pratiques du développement. Son parcours montre une évolution constante et une passion pour l'innovation technologique.";
    }
    
    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('contacter') || lowerMessage.includes('joindre') || 
        lowerMessage.includes('email') || lowerMessage.includes('collaboration') || lowerMessage.includes('embauche')) {
      console.log('Frontend detected: Contact');
      return "Vous pouvez contacter Emmanuel facilement ! 📧 Utilisez le formulaire de contact sur ce site web, ou consultez son GitHub très actif : https://github.com/EMMADEKO10. Il est ouvert aux collaborations et opportunités professionnelles !";
    }
    
    // Diasporium
    if (lowerMessage.includes('diasporium')) {
      console.log('Frontend detected: Diasporium');
      return "Diasporium est le projet phare d'Emmanuel ! 🌍 Une plateforme moderne pour l'intégration de la diaspora congolaise. Technologies : NextJS, NodeJS, WebSocket, Firebase. Vraiment impressionnant : https://diasporium.vercel.app";
    }
    
    // Salutations
    if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello') || 
        lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('bonsoir')) {
      console.log('Frontend detected: Greeting');
      return "Bonjour ! 👋 Ravi de vous rencontrer ! Je suis l'assistant IA d'Emmanuel. Comment puis-je vous aider à découvrir son travail et ses compétences ?";
    }
    
    // Remerciements
    if (lowerMessage.includes('merci') || lowerMessage.includes('thank')) {
      console.log('Frontend detected: Thanks');
      return "De rien ! 😊 Je suis là pour vous aider à découvrir le travail d'Emmanuel. N'hésitez pas si vous avez d'autres questions !";
    }
    
    // Questions générales avec vérification spécifique
    if (lowerMessage.includes('quoi') || lowerMessage.includes('que') || lowerMessage.includes('comment') || 
        lowerMessage.includes('pourquoi') || lowerMessage.includes('?')) {
      console.log('Frontend detected: General question - checking specifics');
      
      if (lowerMessage.includes('compétence') || lowerMessage.includes('competence')) {
        return "Emmanuel maîtrise un large éventail de technologies ! Angular, React, NextJS pour le frontend, NodeJS et Python pour le backend, Docker pour le déploiement, et des bases de données modernes comme MongoDB et Firebase.";
      }
      if (lowerMessage.includes('projet')) {
        return "Les projets d'Emmanuel sont impressionnants ! Diasporium (plateforme diaspora avec NextJS/NodeJS) et le système de bourses RDC montrent son expertise fullstack et sa capacité à livrer des solutions complètes.";
      }
      if (lowerMessage.includes('emmanuel') || lowerMessage.includes('deko')) {
        return "Emmanuel est un architecte du numérique ! 🚀 Il excelle dans la création d'applications web complètes, combinant expertise technique et vision créative pour des solutions élégantes et performantes.";
      }
    }
    
    console.log('Frontend using default response');
    return "Je suis ravi de vous parler d'Emmanuel ! 😊 Il est développeur fullstack avec plus de 5 ans d'expérience. Que souhaitez-vous savoir : ses compétences (Angular, React, NodeJS), ses projets (Diasporium), ou son parcours ?";
  }
} 