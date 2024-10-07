import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
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
            animate('0.5s ease', style({ opacity: 1, transform: 'translateY(0)' }))
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
      liveUrl: "https://ecommerce-platform-demo.com",
      featured: true
    },
    {
      id: 2,
      title: "AI-powered Chatbot",
      description: "An intelligent chatbot using natural language processing for customer support.",
      imageUrl: "/arton59.jpeg",
      technologies: ["Python", "TensorFlow", "Flask", "React"],
      githubUrl: "https://github.com/yourusername/ai-chatbot",
      liveUrl: "https://ai-chatbot-demo.com",
      featured: true
    },
    // Add more projects here...
  ];


  filteredProjects: Project[] = [];
  searchTerm: string = '';
  selectedTechnology: string = '';
  technologies: string[] = [];

  ngOnInit() {
    this.filteredProjects = this.projects;
    this.extractTechnologies();
  }

  ngAfterViewInit() {
    this.initializeParallaxEffect();
  }

  private extractTechnologies() {
    const techSet = new Set<string>();
    this.projects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    this.technologies = Array.from(techSet);
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter(project =>
      project.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedTechnology === '' || project.technologies.includes(this.selectedTechnology))
    );
  }

  private initializeParallaxEffect() {
    const container = this.projectsContainer.nativeElement;
    container.addEventListener('mousemove', (e: MouseEvent) => {
      const cards = container.getElementsByClassName('project-card');
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;

        const angleX = (mouseY - cardY) / 30;
        const angleY = (cardX - mouseX) / 30;

        card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      }
    });

    container.addEventListener('mouseleave', () => {
      const cards = container.getElementsByClassName('project-card');
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      }
    });
  }
}