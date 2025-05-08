import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importez Router

// Interfaces
interface Particle {
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface ConnectingLine {
  x: number;
  y: number;
  width: number;
  rotation: number;
}

interface Technology {
  name: string;
  rotation: number;
}

interface FloatingSkill {
  name: string;
  level: string;
  rotation: number;
  dotColor: string;
  position: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

interface SuccessMetric {
  value: string;
  label: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule]
})


export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  // Propriétés personnelles
  developerName = 'Emmanuel Deko W.';
  experience = 5;
  // profileImage = '/api/placeholder/600/600';
  profileImage = '/IMG_20231221_082253_393~6.jpg';

  private initialColor = 'text-blue-400';
  textColor = this.initialColor;

  // Animations et éléments visuels
  particles: Particle[] = Array(30).fill(null).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5
  }));

  connectingLines: ConnectingLine[] = Array(15).fill(null).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    width: Math.random() * 100 + 50,
    rotation: Math.random() * 360
  }));

 // Updated technologies array
 technologies: Technology[] = [
  { name: 'Angular', rotation: -15 },
  { name: 'React', rotation: 5 },
  { name: 'Vue.js', rotation: -8 },
  { name: 'Node.js', rotation: 10 },
  { name: 'TypeScript', rotation: -5 },
  { name: 'Python', rotation: 8 },
  { name: 'UI/UX', rotation: -12 },
  { name: 'DevOps', rotation: 6 }
];

  // Updated floating skills with adjusted positions
  floatingSkills: FloatingSkill[] = [
    {
      name: 'Frontend Master',
      level: 'Expert',
      rotation: -15,
      dotColor: 'bg-green-400',
      position: { top: '5%', right: '2%' }
    },
    {
      name: 'Backend Pro',
      level: 'Advanced',
      rotation: 10,
      dotColor: 'bg-blue-400',
      position: { bottom: '25%', left: '2%' }
    },
    {
      name: 'UI/UX Designer',
      level: 'Creative',
      rotation: -5,
      dotColor: 'bg-purple-400',
      position: { top: '30%', left: '2%' }
    },
    {
      name: 'DevOps Engineer',
      level: 'Skilled',
      rotation: 8,
      dotColor: 'bg-orange-400',
      position: { bottom: '10%', right: '2%' }
    },
    {
      name: 'Machine Learning',
      level: 'Intermediate',
      rotation: 0,
      dotColor: 'bg-pink-400',
      position: { top: '50%', right: '50%' }
    },

    {
      name: 'Data Analytics',
      level: 'Novice',
      rotation: 15,
      dotColor: 'bg-yellow-400',
      position: { bottom: '75%', left: '2%' }
    },

    {
      name: 'Cloud Computing',
      level: 'Novice',
      rotation: -10,
      dotColor: 'bg-teal-400',
      position: { bottom: '50%', left: '75%' }
    },

  ];


  // Métriques de succès
  successMetrics: SuccessMetric[] = [
    { value: '8+', label: 'Projets Réalisés' },
    { value: '95%', label: 'Clients Satisfaits' },
    { value: '24/7', label: 'Support' },
    { value: '100%', label: 'Engagement' }
  ];

  // Intervalles pour les animations
  private particleInterval?: number;
  private lineInterval?: number;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {} // Injectez le Router


  ngOnInit(): void {
    this.initializeAnimations();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateTextColor();
      this.cdr.detectChanges();
    });
  }

  // Modifiez ces méthodes
  scrollToProjects(): void {
    this.router.navigate(['/projects']);
  }

  scrollToContact(): void {
    this.router.navigate(['/contact']);
  }

  ngOnDestroy(): void {
    this.cleanupAnimations();
  }

   // Add a new method to handle image loading
   onImageLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.naturalHeight > img.naturalWidth) {
      img.style.width = '100%';
      img.style.height = 'auto';
    } else {
      img.style.width = 'auto';
      img.style.height = '100%';
    }
  }

  /**
   * Initialise les animations des particules et des lignes
   */
  private initializeAnimations(): void {
    // Vérifiez que window est disponible
    if (typeof window !== 'undefined') {
      this.particleInterval = window.setInterval(() => {
        this.particles = this.particles.map(particle => ({
          ...particle,
          x: (particle.x + (Math.random() * 2 - 1) + 100) % 100,
          y: (particle.y + (Math.random() * 2 - 1) + 100) % 100
        }));
      }, 3000);

      this.lineInterval = window.setInterval(() => {
        this.connectingLines = this.connectingLines.map(line => ({
          ...line,
          rotation: (line.rotation + 1) % 360
        }));
      }, 50);
    }
  }

  private cleanupAnimations(): void {
    if (typeof window !== 'undefined') {
      if (this.particleInterval) {
        window.clearInterval(this.particleInterval);
      }
      if (this.lineInterval) {
        window.clearInterval(this.lineInterval);
      }
    }
  }

  /**
   * Nettoie les intervalles d'animation
   */

  /**
   * Défilement vers la section projets
   */
  // scrollToProjects(): void {
  //   const projectsSection = document.getElementById('projects');
  //   if (projectsSection) {
  //     projectsSection.scrollIntoView({ 
  //       behavior: 'smooth',
  //       block: 'start'
  //     });
  //   }
  // }

   // Modifiez dans le template
  // [ngClass]="technologyColors[tech.name]"
  getRandomColorClass(): string {
    const colors = ['text-blue-400', 'text-green-400', 'text-yellow-400', 'text-red-400', 'text-purple-400'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  /**
   * Défilement vers la section contact
   */
//   scrollToContact(): void {
//     const contactSection = document.getElementById('contact');
//     if (contactSection) {
//       contactSection.scrollIntoView({ 
//         behavior: 'smooth',
//         block: 'start'
//       });
//     }
//   }

  getTextColor(): string {
    return this.textColor;
  }

  updateTextColor() {
    const colors = ['text-blue-400', 'text-red-400', 'text-green-400', 'text-purple-400'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    this.textColor = colors[randomIndex];
  }
}