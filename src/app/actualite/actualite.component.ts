import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

interface Actualite {
  titre: string;
  date: Date;
  description: string;
  categorie: string;
  image?: string;
}

@Component({
  selector: 'app-actualite',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './actualite.component.html',
  styleUrl: './actualite.component.css',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ActualiteComponent {
  actualites: Actualite[] = [
    {
      titre: 'Nouveau projet React lancé',
      date: new Date('2024-03-15'),
      description: 'Lancement d\'une nouvelle application web utilisant React et TypeScript. Ce projet innovant intègre les dernières fonctionnalités de React 18 et utilise une architecture moderne basée sur les hooks.',
      categorie: 'Développement',
      image: 'assets/images/react-project.jpg'
    },
    {
      titre: 'Formation Angular avancée',
      date: new Date('2024-03-10'),
      description: 'Participation à une formation approfondie sur Angular 17, couvrant les signals, les dernières optimisations de performances et les meilleures pratiques de développement.',
      categorie: 'Formation',
      image: 'assets/images/angular-formation.jpg'
    },
    {
      titre: 'Contribution Open Source',
      date: new Date('2024-03-05'),
      description: 'Première contribution majeure acceptée dans un projet open source populaire. Amélioration de la documentation et correction de bugs critiques.',
      categorie: 'Open Source',
      image: 'assets/images/opensource.jpg'
    },
    {
      titre: 'Certification AWS obtenue',
      date: new Date('2024-02-28'),
      description: 'Obtention de la certification AWS Solutions Architect Associate, renforçant mes compétences en cloud computing et architecture distribuée.',
      categorie: 'Certification'
    },
    {
      titre: 'Nouveau Blog Technique',
      date: new Date('2024-02-20'),
      description: 'Lancement de mon blog technique personnel où je partage mes expériences et conseils en développement web moderne.',
      categorie: 'Blog',
      image: 'assets/images/blog.jpg'
    }
  ];
}
