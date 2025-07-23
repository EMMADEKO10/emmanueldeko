import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { ChatbotService, ChatMessage } from '../../services/chatbot.service';

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
  messages: ChatMessage[] = [];
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
  
  async sendMessage() {
    if (!this.currentMessage.trim()) return;
    
    // Ajouter le message de l'utilisateur
    this.messages.push({
      content: this.currentMessage,
      isUser: true,
      timestamp: new Date()
    });
    
    const userMessage = this.currentMessage;
    this.currentMessage = '';
    this.isTyping = true;
    
    try {
      // Tentative d'appel à l'API
      this.chatbotService.sendMessage(userMessage).subscribe({
        next: (response) => {
          this.messages.push({
            content: response.response,
            isUser: false,
            timestamp: new Date()
          });
          this.isTyping = false;
        },
        error: (error) => {
          // En cas d'erreur, utiliser la réponse de fallback
          console.log('API non disponible, utilisation du fallback:', error);
          const fallbackResponse = this.chatbotService.getFallbackResponse(userMessage);
          this.messages.push({
            content: fallbackResponse,
            isUser: false,
            timestamp: new Date()
          });
          this.isTyping = false;
        }
      });
    } catch (error) {
      // Fallback en cas d'erreur
      const fallbackResponse = this.chatbotService.getFallbackResponse(userMessage);
      this.messages.push({
        content: fallbackResponse,
        isUser: false,
        timestamp: new Date()
      });
      this.isTyping = false;
    }
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