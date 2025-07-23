// projects.component.ts
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
      title: "Diasporium",
      description: "En tant que developpeur fullStack, j'ai eu à réaliser une application complete front/back-end pour la structure Diasporium, pour l'integration, et l'accompagment de la diaspora au congo.",
      imageUrl: "/Identité Visuels copie A.png",
      technologies: ["figma", "NextJS", "NodeJS", "webSoketIO", "Cloudinary", "firebase"],
      githubUrl: "https://github.com/EMMADEKO10",
      liveUrl: "https://diasporium.cd",
      featured: true
    },

    {
      id: 2,
      title: "Cellule interministerielle pour la gestion des Bourses",
      description: "J'ai réalisé un projet, pour la gestion, le suivi, des bourses d'études pour la cellule interministerielle de gestion des bourses en république démocratique du congo ",
      imageUrl: "/logo cellule interminiterielle nicky.jpg",
      technologies: ["WordPress"],
      githubUrl: "https://github.com/EMMADEKO10",
      liveUrl: "https://celbe-rdc.cd",
      featured: true
    },

    {
      id: 3,
      title: "Sotradons",
      description: "J'ai réalisé l'application front/back-end, pour la structure Sotradons, une plateforme qui permet de mettre les projects en lumière et qui permet la sponsorisation ",
      imageUrl: "/Capture d'écran 2024-07-03 163849A.PNG",
      technologies: ["React", "NodeJS", "Cloudinary", "figma"],
      githubUrl: "https://github.com/EMMADEKO10",
      liveUrl: "https://sotradons.org",
      featured: true
    },

    {
      id: 4,
      title: "Brievents",
      description: "J'ai réalisé un projet brievent, pour la gestion des évenements",
      imageUrl: "/DALL·E 2024-12-02 12.59.24 - Create a professional and sleek logo-style image with the text 'Brievent'. Use a modern font and incorporate a palette of blue, white, and black. The .webp",
      technologies: ["React", "NodeJS", "Cloudinary", "JavaScript", "TailWind UI"],
      githubUrl: "https://github.com/EMMADEKO10",
      liveUrl: "https://brievents.com",
      featured: true
    },
    {
      id: 5,
      title: "Festival des poulets",
      description: "En tant que developper Back-end, j'ai contribué à la réalisation du site poulex, pour le festival des poulets",
      imageUrl: "/DALL·E 2024-12-02 13.23.03 - Create a vibrant and celebratory poster for a chicken-themed festival. The design should feature chickens and roosters in a lively, colorful setting w.webp",
      technologies: ["Node JS","JavasCript"],
      githubUrl: "https://github.com/EMMADEKO10",
      liveUrl: "https://poulex.cd",
      featured: true
    },

    {
      id: 6,
      title: "Mon Portefolio",
      description: "J'ai réalisé mon portefolio, le site qui me presente, qui presente ce que je fais ",
      imageUrl: "/DALL·E 2024-12-02 13.07.03 - Design a professional portfolio-style image featuring a person in the foreground (center-left), with the name 'Emmanuel Deko' and the title 'Codeur' p.webp",
      technologies: ["Angular", "Tailwind UI"],
      githubUrl: "https://github.com/EMMADEKO10",
      liveUrl: "https://emmanueldeko.com",
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
  private isBrowser: boolean;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.isBrowser) {
      this.checkScreenSize();
    }
  }

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.checkScreenSize();
    }
  }

  private checkScreenSize() {
    if (this.isBrowser) {
      this.isMobile = window.innerWidth < 768;
    }
  }

  ngOnInit() {
    this.filteredProjects = this.projects;
    this.extractTechnologies();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngAfterViewInit() {
    if (this.isBrowser && !this.isMobile) {
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
    if (!this.isBrowser) return;

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