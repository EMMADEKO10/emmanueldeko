import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms cubic-bezier(0.35, 0, 0.25, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('600ms cubic-bezier(0.35, 0, 0.25, 1)', 
          style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('progressBar', [
      transition(':enter', [
        style({ width: 0 }),
        animate('1000ms cubic-bezier(0.35, 0, 0.25, 1)')
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {
  skillCategories = [
    {
      name: 'Frontend',
      icon: 'desktop_windows',
      skills: [
        { name: 'Angular', level: 90 },
        { name: 'React', level: 85 },
        { name: 'TypeScript', level: 90 },
        { name: 'HTML/CSS', level: 95 }
      ]
    },
    {
      name: 'Backend',
      icon: 'dns',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Java', level: 75 },
        { name: 'SQL', level: 85 }
      ]
    },
    {
      name: 'Autres',
      icon: 'code',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'Agile/Scrum', level: 85 }
      ]
    }
  ];

  experiences = [
    {
      role: 'Développeur Full Stack Senior',
      company: 'Entreprise Tech',
      period: '2020 - Présent',
      description: 'Direction technique de projets majeurs, développement d\'applications web complexes, mise en place de bonnes pratiques.',
      technologies: ['Angular', 'Node.js', 'PostgreSQL', 'AWS']
    },
    {
      role: 'Développeur Frontend',
      company: 'Startup Innovante',
      period: '2018 - 2020',
      description: 'Développement d\'interfaces utilisateur modernes et responsives, optimisation des performances.',
      technologies: ['React', 'TypeScript', 'Redux', 'SASS']
    },
    {
      role: 'Développeur Full Stack Junior',
      company: 'Agence Web',
      period: '2016 - 2018',
      description: 'Création de sites web et d\'applications pour divers clients, maintenance et support technique.',
      technologies: ['Angular', 'PHP', 'MySQL', 'JavaScript']
    }
  ];

  educationList = [
    {
      degree: 'Master en Informatique',
      school: 'École d\'Ingénieurs',
      period: '2014 - 2016',
      description: 'Spécialisation en développement web et architectures logicielles.'
    },
    {
      degree: 'Licence en Informatique',
      school: 'Université',
      period: '2011 - 2014',
      description: 'Formation généraliste en informatique avec focus sur la programmation.'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // Initialisation du composant si nécessaire
  }
}