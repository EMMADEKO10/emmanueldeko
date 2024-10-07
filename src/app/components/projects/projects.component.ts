// projects.component.ts
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';
import { FormsModule } from '@angular/forms';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger(100, [
            animate('0.5s cubic-bezier(0.4, 0, 0.2, 1)', 
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  @ViewChild('projectsContainer') projectsContainer!: ElementRef;

  projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management.",
      imageUrl: "/top-view-vegetables-colorful-spices-vegetables-lentil-min.webp",
      technologies: ["Angular", "Node.js", "MongoDB", "Socket.io"],
      githubUrl: "https://github.com/yourusername/ecommerce-platform",
      liveUrl: "https://sotradons.vercel.app",
      featured: true
    },
    {
      id: 2,
      title: "AI-powered Chatbot",
      description: "An intelligent chatbot using natural language processing for customer support.",
      imageUrl: "/arton59.jpeg",
      technologies: ["Python", "TensorFlow", "Flask", "React"],
      githubUrl: "https://github.com/yourusername/ai-chatbot",
      liveUrl: "https://diasporium.vercel.app",
      featured: true
    },

    {
      id: 2,
      title: "AI-powered Chatbot",
      description: "An intelligent chatbot using natural language processing for customer support.",
      imageUrl: "/arton55.jpeg",
      technologies: ["Python", "TensorFlow", "Flask", "React"],
      githubUrl: "https://github.com/yourusername/ai-chatbot",
      liveUrl: "https://poulex.vercel.app",
      featured: true
    },
    // Add more projects here...
  ];


  filteredProjects: Project[] = [];
  searchTerm: string = '';
  selectedTechnology: string = '';
  technologies: string[] = [];
  isLoading: boolean = true;
  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  constructor() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  ngOnInit() {
    this.filteredProjects = this.projects;
    this.extractTechnologies();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngAfterViewInit() {
    if (!this.isMobile) {
      this.initializeParallaxEffect();
    }
  }

  private extractTechnologies() {
    const techSet = new Set<string>();
    this.projects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    this.technologies = Array.from(techSet).sort();
  }

  filterProjects() {
    const searchLower = this.searchTerm.toLowerCase();
    this.filteredProjects = this.projects.filter(project =>
      (project.title.toLowerCase().includes(searchLower) ||
       project.description.toLowerCase().includes(searchLower)) &&
      (this.selectedTechnology === '' || project.technologies.includes(this.selectedTechnology))
    );
  }

  private initializeParallaxEffect() {
    const container = this.projectsContainer.nativeElement;
    let cards: HTMLElement[] = [];
    
    const updateCards = () => {
      cards = Array.from(container.getElementsByClassName('project-card')) as HTMLElement[];
    };

    updateCards();

    container.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
        const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

        const angleX = (mouseY - cardCenterY) / 30;
        const angleY = (cardCenterX - mouseX) / 30;

        card.style.transform = `
          perspective(1000px) 
          rotateX(${angleX}deg) 
          rotateY(${angleY}deg) 
          scale3d(1.02, 1.02, 1.02)
        `;
      });
    });

    container.addEventListener('mouseleave', () => {
      cards.forEach((card) => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }
}