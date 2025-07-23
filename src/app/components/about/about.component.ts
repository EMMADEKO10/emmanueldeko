import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

  // Informations personnelles avec mots-clés SEO
  personalInfo = {
    fullName: 'Emmanuel Deko W.',
    nicknames: ['Belcheck', 'Belcheck Atwood'],
    title: 'Développeur Full Stack Expert',
    location: 'Kinshasa, République Démocratique du Congo',
    experience: '5+ années',
    description: 'Emmanuel Deko Wembolwa, connu sous le nom de Belcheck ou Belcheck Atwood, est un développeur full stack expert basé à Kinshasa. Spécialisé en technologies web modernes, il a créé des solutions innovantes comme Diasporium et le système de gestion des bourses pour la RDC.'
  };

  // Compétences techniques détaillées
  skillCategories = [
    {
      name: 'Frontend Development',
      icon: 'code',
      description: 'Technologies modernes pour interfaces utilisateur exceptionnelles',
      skills: [
        { name: 'Angular', level: 95, description: 'Framework principal utilisé pour Diasporium' },
        { name: 'React', level: 90, description: 'Développement d\'interfaces dynamiques' },
        { name: 'TypeScript', level: 92, description: 'Code robuste et maintenable' },
        { name: 'HTML5/CSS3', level: 95, description: 'Standards web modernes' },
        { name: 'Tailwind CSS', level: 88, description: 'Styling utilitaire efficace' }
      ]
    },
    {
      name: 'Backend Development',
      icon: 'server',
      description: 'Architectures serveur scalables et performantes',
      skills: [
        { name: 'Node.js', level: 93, description: 'Runtime JavaScript pour le système RDC' },
        { name: 'Python', level: 85, description: 'Analyse de données et IA' },
        { name: 'Express.js', level: 90, description: 'APIs REST performantes' },
        { name: 'MongoDB', level: 87, description: 'Base de données NoSQL' },
        { name: 'PostgreSQL', level: 82, description: 'SGBD relationnel' }
      ]
    },
    {
      name: 'DevOps & Cloud',
      icon: 'cloud',
      description: 'Déploiement et infrastructure cloud modernes',
      skills: [
        { name: 'Docker', level: 88, description: 'Containerisation des applications' },
        { name: 'Firebase', level: 85, description: 'Backend-as-a-Service pour Diasporium' },
        { name: 'Vercel', level: 90, description: 'Déploiement front-end optimisé' },
        { name: 'Git/GitHub', level: 95, description: 'Contrôle de version et collaboration' },
        { name: 'CI/CD', level: 80, description: 'Intégration et déploiement continus' }
      ]
    }
  ];

  // Expériences professionnelles avec projets spécifiques
  experiences = [
    {
      role: 'Développeur Full Stack Senior',
      company: 'Projets Personnels & Freelance',
      period: '2020 - Présent',
      location: 'Kinshasa, RDC',
      description: 'Emmanuel Deko (Belcheck) développe des solutions web innovantes pour des clients variés. Créateur de Diasporium, plateforme pour la diaspora congolaise, et du système de gestion des bourses pour la République Démocratique du Congo.',
      technologies: ['Angular', 'React', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'Firebase'],
      achievements: [
        'Développement de Diasporium avec plus de 2000 utilisateurs',
        'Création du système de bourses RDC pour le gouvernement',
        'Architecture et déploiement d\'applications scalables',
        'Mentoring d\'équipes de développement junior'
      ]
    },
    {
      role: 'Développeur Web Full Stack',
      company: 'Projets Open Source & Communauté',
      period: '2019 - 2020',
      location: 'Kinshasa, RDC',
      description: 'Belcheck Atwood contribue activement à l\'écosystème open source et développe des solutions pour la communauté tech congolaise.',
      technologies: ['JavaScript', 'PHP', 'WordPress', 'MySQL', 'HTML/CSS'],
      achievements: [
        'Contribution à des projets open source populaires',
        'Formation de développeurs junior',
        'Développement de sites web pour PME locales'
      ]
    }
  ];

  // Parcours éducatif
  educationList = [
    {
      degree: 'Formation Autodidacte en Développement Web',
      school: 'Apprentissage Continu & Technologies Modernes',
      period: '2018 - Présent',
      location: 'Kinshasa, RDC',
      description: 'Emmanuel Deko Wembolwa (Belcheck) a développé son expertise grâce à l\'apprentissage autonome, suivant les dernières tendances en développement web. Spécialisation en technologies JavaScript modernes, architecture cloud et bonnes pratiques de développement.',
      focus: ['JavaScript/TypeScript', 'Frameworks modernes', 'Architecture cloud', 'DevOps']
    },
    {
      degree: 'Certifications Professionnelles',
      school: 'Plateformes d\'apprentissage en ligne',
      period: '2019 - 2024',
      location: 'Formation à distance',
      description: 'Certifications continues en développement web, cloud computing et technologies émergentes pour maintenir une expertise de pointe.',
      focus: ['Cloud Computing', 'Modern Web Development', 'Database Design', 'UI/UX Principles']
    }
  ];

  // Projets phares avec détails SEO
  featuredProjects = [
    {
      name: 'Diasporium',
      description: 'Plateforme complète développée par Emmanuel Deko (Belcheck) pour connecter et accompagner la diaspora congolaise. Solution full-stack moderne avec fonctionnalités temps réel.',
      url: 'https://diasporium.vercel.app',
      technologies: ['NextJS', 'Node.js', 'WebSocket', 'Firebase', 'Cloudinary'],
      features: ['Chat temps réel', 'Gestion de profils', 'Événements communautaires', 'Partage de ressources'],
      impact: '2000+ utilisateurs actifs, plateforme de référence pour la diaspora'
    },
    {
      name: 'Système de Gestion des Bourses RDC',
      description: 'Solution gouvernementale créée par Belcheck Atwood pour la gestion des bourses d\'études en République Démocratique du Congo. Interface administrative complète.',
      url: 'https://celbe-rdc.cd',
      technologies: ['WordPress', 'PHP', 'MySQL', 'Custom Plugins'],
      features: ['Gestion des candidatures', 'Suivi des dossiers', 'Rapports statistiques', 'Interface administrative'],
      impact: 'Modernisation du processus de gestion des bourses nationales'
    }
  ];

  // Compétences linguistiques
  languages = [
    { name: 'Français', level: 'Natif', flag: '🇫🇷' },
    { name: 'Lingala', level: 'Natif', flag: '🇨🇩' },
    { name: 'Anglais', level: 'Professionnel', flag: '🇺🇸' },
    { name: 'Kikongo', level: 'Conversationnel', flag: '🇨🇩' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialisation du composant avec données SEO
    this.setPageMeta();
  }

  private setPageMeta(): void {
    // Métadonnées spécifiques à la page About
    if (typeof document !== 'undefined') {
      document.title = `À propos de ${this.personalInfo.fullName} (${this.personalInfo.nicknames.join(', ')}) - Portfolio`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `Découvrez le parcours d'Emmanuel Deko Wembolwa (Belcheck/Belcheck Atwood), développeur full stack expert de Kinshasa. Créateur de Diasporium et du système de bourses RDC.`
        );
      }
    }
  }

  // Données structurées pour SEO
  getPersonSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": this.personalInfo.fullName,
      "alternateName": this.personalInfo.nicknames,
      "jobTitle": this.personalInfo.title,
      "description": this.personalInfo.description,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kinshasa",
        "addressCountry": "CD"
      },
      "knowsAbout": this.skillCategories.flatMap(cat => cat.skills.map(skill => skill.name)),
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Développeur Full Stack",
        "description": "Développement d'applications web modernes et solutions cloud"
      }
    };
  }

  // Méthode pour obtenir le niveau de compétence en pourcentage
  getSkillPercentage(skill: any): string {
    return `${skill.level}%`;
  }

  // Navigation vers les projets
  navigateToProjects(): void {
    // Logique de navigation
    window.location.href = '/projects';
  }
}