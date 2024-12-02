import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('progressBar', [
      state('void', style({ width: 0 })),
      state('*', style({ width: '{{percentage}}%' }), { params: { percentage: 0 } }),
      transition('void => *', [
        animate('1000ms ease-out')
      ])
    ])
  ],
  standalone: true,
  imports: [
    RouterLink,
    NgFor
  ]
})
export class AboutComponent implements OnInit {
  skillCategories: SkillCategory[] = [
    {
      name: 'Développement Web',
      icon: 'code',
      skills: [
        { name: 'JavaScript', level: 90 },
        { name: 'React/Next.js', level: 85 },
        { name: 'Angular', level: 85 },
        { name: 'Node.js', level: 80 }
      ]
    },
    {
      name: 'Data Science & ML',
      icon: 'chart-line',
      skills: [
        { name: 'Python/TensorFlow', level: 85 },
        { name: 'Stata/Eviews', level: 80 },
        { name: 'Excel Avancé', level: 90 },
        { name: 'Analyse de données', level: 85 }
      ]
    },
    {
      name: 'DevOps & Outils',
      icon: 'tools',
      skills: [
        { name: 'Git/GitHub', level: 90 },
        { name: 'Linux/Windows', level: 85 },
        { name: 'Cloud (Firebase/Cloudinary)', level: 80 },
        { name: 'Méthodologie Agile/Scrum', level: 85 }
      ]
    }
  ];

  experiences: Experience[] = [
    {
      role: 'Développeur Full Stack',
      company: 'Fondation Vodacom',
      period: '2023 - Présent',
      description: 'Développement de plateformes innovantes, implementation de solutions technologiques avancées.',
      technologies: ['React', 'Node.js', 'Cloud', 'Agile']
    },
    {
      role: 'Développeur Web',
      company: 'AL & Legacy',
      period: '2022 - 2023',
      description: 'Développement de trois projets majeurs : Sotradons, Diasporium, et Leadership Academie.',
      technologies: ['Angular', 'Next.js', 'Firebase', 'TypeScript']
    }
  ];

  educationList: Education[] = [
    {
      degree: 'Formation Développement Web & Mobile',
      school: 'Kinshasa Digital Academy (KADEA)',
      period: '2022 - 2023',
      description: 'Formation intensive en développement web et mobile, avec focus sur les technologies modernes.'
    },
    {
      degree: 'Mathématiques-Informatique',
      school: 'Université de Kinshasa (UNIKIN)',
      period: '2018 - 2022',
      description: 'Formation approfondie en mathématiques et informatique, spécialisation en programmation et analyse de données.'
    },
    {
      degree: 'Études Secondaires',
      school: 'Divers Établissements',
      period: '2015 - 2018',
      description: 'Parcours dans plusieurs établissements prestigieux : Kahozé (Moba), Lubuyé (Kalemie), Collège Ex-présidentiel (Gbadolité).'
    }
  ];

  isInViewport(element: Element): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  getProgressBarState(level: number) {
    return { value: 'shown', params: { percentage: level } };
  }

  constructor() {}

  ngOnInit(): void {
    // Initialisation des animations et des observateurs d'intersection si nécessaire
  }
}