import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { ChatbotService } from '../../services/chatbot.service';

// Configuration locale pour le debug
const isProduction = typeof window !== 'undefined' && 
  (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1');

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
  source?: string;
  sourceIcon?: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms ease-in', style({ transform: 'translateY(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('200ms ease-in', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  isOpen = false;
  messages: Message[] = [];
  currentMessage = '';
  isTyping = false;
  
  constructor(private chatbotService: ChatbotService) {}
  
  ngOnInit() {
    // Message de bienvenue
    this.messages.push({
      content: "👋 Salut ! Je suis l'assistant IA d'Emmanuel. Posez-moi des questions sur son parcours, ses compétences ou ses projets !",
      isUser: false,
      timestamp: new Date()
    });
  }
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
  toggleChat() {
    this.isOpen = !this.isOpen;
  }
  
  sendMessage() {
    if (!this.currentMessage.trim()) {
      return;
    }

    // Ajouter le message de l'utilisateur
    this.messages.push({
      content: this.currentMessage,
      isUser: true,
      timestamp: new Date()
    });

    const userMessage = this.currentMessage;
    this.currentMessage = '';
    this.isTyping = true;

    console.log('🗣️ User message:', userMessage);

    // Appel au service amélioré
    this.chatbotService.sendMessage(userMessage).subscribe({
      next: (response) => {
        console.log('📨 Response received:', response);
        
        // Déterminer l'icône selon la source
        let sourceIcon = '🤖';
        let sourceText = '';
        
        if (response.source === 'openai') {
          sourceIcon = '🧠';
          sourceText = ' (Réponse IA OpenAI)';
        } else if (response.source === 'predefined') {
          sourceIcon = '📋';
          sourceText = ' (Analyse sémantique)';
        } else if (response.source === 'frontend_fallback') {
          sourceIcon = '⚡';
          sourceText = ' (Mode fallback)';
        } else if (response.source === 'error_fallback') {
          sourceIcon = '🔧';
          sourceText = ' (Fallback d\'erreur)';
        }

        this.messages.push({
          content: response.response,
          isUser: false,
          timestamp: new Date(),
          source: response.source,
          sourceIcon: sourceIcon
        });
        
        this.isTyping = false;
        
        // Log pour debug en développement
        if (!isProduction) {
          console.log(`${sourceIcon} Response source: ${response.source}${sourceText}`);
        }
      },
      error: (error) => {
        console.error('❌ Complete failure, using emergency fallback:', error);
        
        this.messages.push({
          content: this.chatbotService.getFallbackResponse(userMessage),
          isUser: false,
          timestamp: new Date(),
          source: 'emergency_fallback',
          sourceIcon: '🆘'
        });
        
        this.isTyping = false;
      }
    });
  }
  
  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch(err) {}
  }
  
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
} 