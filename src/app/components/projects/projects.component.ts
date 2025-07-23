// projects.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  // Informations principales pour le SEO
  developerInfo = {
    fullName: 'Emmanuel Deko Wembolwa',
    nicknames: ['Belcheck', 'Belcheck Atwood'],
    title: 'Développeur Full Stack Expert & Architecte de Solutions',
    location: 'Kinshasa, République Démocratique du Congo',
    description: 'Emmanuel Deko Wembolwa (Belcheck) développe des solutions technologiques innovantes pour des clients prestigieux dans tous les secteurs.'
  };

  // Catégories de projets avec détails enrichis
  projectCategories = [
    {
      id: 'government',
      name: 'Secteur Public & Gouvernemental',
      icon: 'fas fa-university',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-600/10 to-cyan-600/10',
      borderColor: 'border-blue-500/20 hover:border-blue-400/50',
      description: 'Solutions institutionnelles d\'envergure pour le secteur public',
      features: [
        'Systèmes de gestion gouvernementale',
        'Plateformes d\'administration publique', 
        'Solutions de digitalisation étatique',
        'Systèmes de suivi et rapporting'
      ],
      tags: ['Sécurité renforcée', 'Haute disponibilité', 'Conformité'],
      tagColors: ['bg-blue-600/20 text-blue-400 border-blue-500/30', 
                  'bg-cyan-600/20 text-cyan-400 border-cyan-500/30', 
                  'bg-blue-500/20 text-blue-300 border-blue-400/30'],
      clients: ['Institutions gouvernementales', 'Ministères', 'Agences publiques'],
      impact: 'Modernisation des services publics et amélioration de l\'efficacité administrative'
    },
    {
      id: 'corporate',
      name: 'Entreprises & Télécoms',
      icon: 'fas fa-building',
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-600/10 to-pink-600/10',
      borderColor: 'border-red-500/20 hover:border-red-400/50',
      description: 'Solutions corporate d\'entreprise pour grandes organisations',
      features: [
        'Plateformes pour Vodacom & opérateurs',
        'Systèmes de gestion d\'entreprise',
        'Solutions CRM et ERP personnalisées',
        'Portails internes et dashboards'
      ],
      tags: ['Enterprise grade', 'Scalabilité', 'Performance'],
      tagColors: ['bg-red-600/20 text-red-400 border-red-500/30',
                  'bg-pink-600/20 text-pink-400 border-pink-500/30',
                  'bg-red-500/20 text-red-300 border-red-400/30'],
      clients: ['Vodacom', 'Grandes entreprises', 'Multinationales'],
      impact: 'Optimisation des processus métier et augmentation de la productivité'
    },
    {
      id: 'commerce',
      name: 'Commerce & Retail',
      icon: 'fas fa-store',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-600/10 to-emerald-600/10',
      borderColor: 'border-green-500/20 hover:border-green-400/50',
      description: 'Solutions e-commerce et retail modernes',
      features: [
        'Sites e-commerce & marketplaces',
        'Systèmes POS pour restaurants',
        'Gestion supermarchés',
        'Plateformes de réservation'
      ],
      tags: ['E-commerce', 'Payment', 'Inventory'],
      tagColors: ['bg-green-600/20 text-green-400 border-green-500/30',
                  'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
                  'bg-green-500/20 text-green-300 border-green-400/30'],
      clients: ['Restaurants', 'Supermarchés', 'Boutiques en ligne'],
      impact: 'Digitalisation du commerce et amélioration de l\'expérience client'
    },
    {
      id: 'professional',
      name: 'Professionnels & Experts',
      icon: 'fas fa-user-tie',
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-600/10 to-violet-600/10',
      borderColor: 'border-purple-500/20 hover:border-purple-400/50',
      description: 'Portfolios et sites pour professionnels de prestige',
      features: [
        'Portfolios d\'avocats prestigieux',
        'Sites de développeurs experts',
        'Plateformes de consultants',
        'Cabinets de conseil'
      ],
      tags: ['Portfolio', 'Prestige', 'Professional'],
      tagColors: ['bg-purple-600/20 text-purple-400 border-purple-500/30',
                  'bg-violet-600/20 text-violet-400 border-violet-500/30',
                  'bg-purple-500/20 text-purple-300 border-purple-400/30'],
      clients: ['Avocats', 'Consultants', 'Experts techniques'],
      impact: 'Renforcement de l\'image de marque professionnelle'
    },
    {
      id: 'events',
      name: 'Événementiel & Lifestyle',
      icon: 'fas fa-heart',
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-600/10 to-orange-600/10',
      borderColor: 'border-yellow-500/20 hover:border-yellow-400/50',
      description: 'Plateformes pour événements et lifestyle',
      features: [
        'Plateformes de mariage',
        'Sites d\'événements',
        'Réservation de services',
        'Galeries événementielles'
      ],
      tags: ['Événements', 'Lifestyle', 'Booking'],
      tagColors: ['bg-yellow-600/20 text-yellow-400 border-yellow-500/30',
                  'bg-orange-600/20 text-orange-400 border-orange-500/30',
                  'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'],
      clients: ['Organisateurs d\'événements', 'Wedding planners', 'Prestataires'],
      impact: 'Facilitation de l\'organisation d\'événements mémorables'
    },
    {
      id: 'social',
      name: 'Impact Social & Humanitaire',
      icon: 'fas fa-hands-helping',
      gradient: 'from-teal-500 to-blue-500',
      bgGradient: 'from-teal-600/10 to-blue-600/10',
      borderColor: 'border-teal-500/20 hover:border-teal-400/50',
      description: 'Technologies au service de la communauté',
      features: [
        'Plateformes d\'accompagnement féminin',
        'Systèmes de gestion d\'orphelinats',
        'Portails d\'aide communautaire',
        'Solutions de microfinance sociale'
      ],
      tags: ['Social Impact', 'Humanitaire', 'Community'],
      tagColors: ['bg-teal-600/20 text-teal-400 border-teal-500/30',
                  'bg-blue-600/20 text-blue-400 border-blue-500/30',
                  'bg-teal-500/20 text-teal-300 border-teal-400/30'],
      clients: ['ONG', 'Orphelinats', 'Associations féminines'],
      impact: 'Amélioration des conditions de vie et autonomisation des communautés',
      specialMessage: 'La technologie au service de l\'humain et du développement social'
    },
    {
      id: 'media',
      name: 'Média & Information',
      icon: 'fas fa-newspaper',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-600/10 to-purple-600/10',
      borderColor: 'border-indigo-500/20 hover:border-indigo-400/50',
      description: 'Plateformes d\'information modernes',
      features: [
        'Sites d\'actualités et magazines',
        'Portails d\'information sectoriels',
        'Plateformes de contenu éditorial',
        'Systèmes de gestion de contenu'
      ],
      tags: ['CMS avancé', 'SEO optimisé', 'Content'],
      tagColors: ['bg-indigo-600/20 text-indigo-400 border-indigo-500/30',
                  'bg-purple-600/20 text-purple-400 border-purple-500/30',
                  'bg-indigo-500/20 text-indigo-300 border-indigo-400/30'],
      clients: ['Médias', 'Magazines', 'Portails d\'information'],
      impact: 'Diffusion efficace de l\'information et engagement du public'
    }
  ];

  // Statistiques impressionnantes
  statistics = [
    {
      value: '15',
      label: 'Projets Réalisés',
      icon: 'fas fa-project-diagram',
      gradient: 'from-blue-500 to-cyan-500',
      color: 'text-blue-400'
    },
    {
      value: '14',
      label: 'Clients Satisfaits',
      icon: 'fas fa-handshake',
      gradient: 'from-green-500 to-emerald-500',
      color: 'text-green-400'
    },
    {
      value: '7',
      label: 'Secteurs Couverts',
      icon: 'fas fa-industry',
      gradient: 'from-purple-500 to-pink-500',
      color: 'text-purple-400'
    },
    {
      value: '90%',
      label: 'Satisfaction Client',
      icon: 'fas fa-award',
      gradient: 'from-yellow-500 to-orange-500',
      color: 'text-yellow-400'
    }
  ];

  // Technologies et approches utilisées
  technicalApproaches = [
    {
      name: 'Architecture Moderne',
      description: 'Microservices, Cloud-native, API-first',
      icon: 'fas fa-sitemap'
    },
    {
      name: 'Sécurité Renforcée',
      description: 'Authentification robuste, chiffrement, conformité',
      icon: 'fas fa-shield-alt'
    },
    {
      name: 'Performance Optimale',
      description: 'CDN, caching, optimisation base de données',
      icon: 'fas fa-tachometer-alt'
    },
    {
      name: 'UI/UX Excellence',
      description: 'Design moderne, ergonomie, accessibilité',
      icon: 'fas fa-palette'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.setPageMeta();
    this.initializeAnimations();
  }

  private setPageMeta(): void {
    if (typeof document !== 'undefined') {
      document.title = `Projets de ${this.developerInfo.fullName} (${this.developerInfo.nicknames.join('/')}) - Portfolio Professionnel`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `Découvrez les réalisations professionnelles d'Emmanuel Deko Wembolwa (Belcheck/Belcheck Atwood) : projets gouvernementaux, entreprises (Vodacom), commerce, social et plus. Portfolio confidentiel sur demande.`
        );
      }
    }
  }

  private initializeAnimations(): void {
    if (typeof document === 'undefined') return;
    
    // Animations d'entrée progressive pour les éléments
    setTimeout(() => {
      const elements = document.querySelectorAll('.group');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animate-fade-in');
        }, index * 100);
      });
    }, 300);
  }

  // Méthodes utilitaires pour le template
  getProjectsByCategory(categoryId: string) {
    return this.projectCategories.find(cat => cat.id === categoryId);
  }

  // Données structurées pour SEO
  getProjectsSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": this.developerInfo.fullName,
      "alternateName": this.developerInfo.nicknames,
      "jobTitle": this.developerInfo.title,
      "description": this.developerInfo.description,
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Développeur Full Stack",
        "skills": this.projectCategories.map(cat => cat.name)
      },
      "knowsAbout": this.projectCategories.flatMap(cat => cat.features)
    };
  }

  // Navigation vers contact
  navigateToContact(): void {
    if (typeof window !== 'undefined') {
      window.location.href = '/contact';
    }
  }

  // Ouverture email
  openEmailContact(): void {
    if (typeof window !== 'undefined') {
      window.location.href = 'mailto:contact@emmanueldeko.com?subject=Demande de Portfolio Complet - Emmanuel Deko (Belcheck)&body=Bonjour Emmanuel,%0D%0A%0D%0AJe souhaiterais consulter votre portfolio complet et discuter d\'un projet potentiel.%0D%0A%0D%0AMerci de me recontacter.%0D%0A%0D%0ACordialement';
    }
  }
}