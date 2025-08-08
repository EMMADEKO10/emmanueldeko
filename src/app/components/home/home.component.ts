import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ChatbotComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  isDarkMode = true;
  private themeSubscription: Subscription;

  // Nom optimisé pour SEO
  developerName = 'Emmanuel Deko Wembolwa (Belcheck)';
  
  // Description enrichie avec mots-clés
  profileDescription = 'Emmanuel Deko Wembolwa, connu sous le nom de Belcheck ou Belcheck Atwood, développeur full stack expert basé à Kinshasa. Créateur de Diasporium et du système de bourses RDC.';
  
  experience = 5;
  
  profileImage = '/IMG_20231221_082253_393~6.jpg';

  // Technologies avec descriptions SEO
  technologies = [
    { name: 'Angular', rotation: 2, description: 'Framework principal pour Diasporium' },
    { name: 'React', rotation: -1, description: 'Interface moderne et réactive' },
    { name: 'Node.js', rotation: 1, description: 'Backend du système de bourses RDC' },
    { name: 'TypeScript', rotation: -2, description: 'Développement scalable' },
    { name: 'Python', rotation: 0, description: 'Analyse de données et IA' },
    { name: 'Docker', rotation: 3, description: 'Déploiement professionnel' },
    { name: 'MongoDB', rotation: -1, description: 'Base de données NoSQL' },
    { name: 'Firebase', rotation: 1, description: 'Backend-as-a-Service' }
  ];

  // Projets avec mots-clés pour SEO
  featuredProjects = [
    {
      name: 'Diasporium',
      description: 'Plateforme innovante pour la diaspora congolaise développée par Emmanuel Deko (Belcheck)',
      url: 'https://diasporium.vercel.app',
      technologies: ['NextJS', 'NodeJS', 'WebSocket', 'Firebase']
    },
    {
      name: 'Système de Bourses RDC', 
      description: 'Solution de gestion des bourses pour la République Démocratique du Congo par Belcheck Atwood',
      url: 'https://celbe-rdc.cd',
      technologies: ['WordPress', 'PHP', 'MySQL']
    }
  ];

  // Compétences avec contexte SEO
  floatingSkills = [
    { name: 'Full Stack', level: 'Expert', dotColor: 'bg-blue-500', rotation: 2 },
    { name: 'UI/UX Design', level: 'Avancé', dotColor: 'bg-purple-500', rotation: -1 },
    { name: 'DevOps', level: 'Intermédiaire', dotColor: 'bg-green-500', rotation: 1 },
    { name: 'Data Analysis', level: 'Avancé', dotColor: 'bg-yellow-500', rotation: -2 }
  ];

  // Métriques de succès avec projets spécifiques
  successMetrics = [
    { value: '20+', label: 'Projets réalisés' },
    { value: '2K+', label: 'Utilisateurs Diasporium' },
    { value: '100%', label: 'Clients satisfaits' },
    { value: '5+', label: 'Années d\'expérience' }
  ];

  particles: any[] = [];
  connectingLines: any[] = [];

  constructor(private router: Router, private themeService: ThemeService) {
    this.themeSubscription = new Subscription();
    // Particules d'animation
    this.generateParticles();
    this.generateConnectingLines();
  }

  ngOnInit() {
    // S'abonner au service de thème
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });
    
    // Animation d'entrée optimisée
    setTimeout(() => {
      this.animateElements();
    }, 100);
  }

  ngAfterViewChecked() {
    // Optimisations post-rendu
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  private generateParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2
      });
    }
  }

  private generateConnectingLines() {
    for (let i = 0; i < 20; i++) {
      this.connectingLines.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        width: Math.random() * 100 + 50,
        rotation: Math.random() * 360
      });
    }
  }

  private animateElements() {
    // Vérification SSR - seulement côté client
    if (typeof document === 'undefined') return;
    
    // Animations fluides pour l'expérience utilisateur
    const elements = document.querySelectorAll('.animate-slideFromLeft, .animate-slideUp, .animate-fadeIn');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animated');
      }, index * 200);
    });
  }

  getTechnologyColor(tech: string): string {
    const colors: { [key: string]: string } = {
      'Angular': 'text-red-400',
      'React': 'text-blue-400', 
      'Node.js': 'text-green-400',
      'TypeScript': 'text-blue-300',
      'Python': 'text-yellow-400',
      'Docker': 'text-cyan-400',
      'MongoDB': 'text-green-500',
      'Firebase': 'text-orange-400'
    };
    return colors[tech] || 'text-white';
  }

  scrollToProjects() {
    // Navigation vers la page projets
    this.router.navigate(['/projects']);
  }

  scrollToContact() {
    // Navigation vers la page contact
    this.router.navigate(['/contact']);
  }

  // Méthodes pour améliorer l'accessibilité et le SEO
  getAriaLabel(): string {
    return `Emmanuel Deko Wembolwa, also known as Belcheck or Belcheck Atwood, Full Stack Developer Portfolio`;
  }

  getSchemaData() {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Emmanuel Deko Wembolwa",
      "alternateName": ["Belcheck", "Belcheck Atwood"],
      "jobTitle": "Développeur Full Stack",
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      },
      "description": this.profileDescription,
      "url": "https://emmanueldeko.com",
      "knowsAbout": this.technologies.map(tech => tech.name)
    };
  }
}