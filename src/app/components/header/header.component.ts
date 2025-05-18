import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('mobileMenu', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class HeaderComponent {
  isMenuOpen = false;
  hoveredItem: any = null;

  navItems = [
    { 
      path: '/', 
      label: 'Accueil',
      icon: 'home',
      description: 'Retour à la page d\'accueil'
    },
    { 
      path: '/about', 
      label: 'À propos',
      icon: 'person',
      description: 'En savoir plus sur moi'
    },
    { 
      path: '/projects', 
      label: 'Projets',
      icon: 'code',
      description: 'Découvrez mes réalisations'
    },
    { 
      path: '/skills', 
      label: 'Compétences',
      icon: 'build',
      description: 'Mes compétences techniques'
    }
  ];

  constructor(private router: Router) {}

  isActive(path: string): boolean {
    return this.router.isActive(path, {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }

  setHoveredItem(item: any): void {
    this.hoveredItem = item;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateAndClose(path: string): void {
    this.router.navigate([path]);
    this.isMenuOpen = false;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}