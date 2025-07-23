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
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('compétence') || lowerMessage.includes('skill')) {
      return "Emmanuel maîtrise plusieurs technologies : Angular, React, NodeJS, Python, Docker, et bien d'autres. Il est particulièrement fort en développement fullstack avec une expertise en Angular et NodeJS.";
    }
    
    if (lowerMessage.includes('projet') || lowerMessage.includes('réalisation')) {
      return "Emmanuel a travaillé sur plusieurs projets importants, notamment Diasporium (plateforme pour la diaspora congolaise) et un système de gestion des bourses pour la RDC. Vous pouvez voir plus de détails sur son portfolio !";
    }
    
    if (lowerMessage.includes('expérience') || lowerMessage.includes('parcours')) {
      return "Emmanuel est un développeur fullstack passionné avec plusieurs années d'expérience. Il a une expertise particulière en Angular, React, et NodeJS, et a développé des applications complètes de A à Z.";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('contacter')) {
      return "Vous pouvez contacter Emmanuel via ce site web dans la section contact, ou consulter son GitHub : https://github.com/EMMADEKO10";
    }
    
    if (lowerMessage.includes('diasporium')) {
      return "Diasporium est une plateforme que Emmanuel a développée pour l'intégration et l'accompagnement de la diaspora congolaise. C'est un projet fullstack utilisant NextJS, NodeJS, WebSocket, et Firebase. Vous pouvez la visiter sur https://diasporium.vercel.app";
    }
    
    return "Merci pour votre question ! Je suis l'assistant IA d'Emmanuel. N'hésitez pas à me poser des questions sur ses compétences, ses projets, ou son parcours professionnel. Vous pouvez aussi explorer son portfolio pour en savoir plus !";
  }
} 