import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { animate, style, transition, trigger } from '@angular/animations';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  description?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  animations: [
    trigger('mobileMenu', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-16px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-16px)' }))
      ])
    ])
  ]
})
export class HeaderComponent {
  private router = inject(Router);
  isMenuOpen = false;
  hoveredItem: NavItem | null = null;

  readonly navItems: NavItem[] = [
    { 
      label: 'Accueil', 
      path: 'home', 
      icon: 'home',
      description: 'Retour à la page d\'accueil'
    },
    { 
      label: 'Projets', 
      path: 'projects', 
      icon: 'work',
      description: 'Découvrez mes réalisations'
    },
    { 
      label: 'Compétences', 
      path: 'skills', 
      icon: 'code',
      description: 'Mes expertises techniques'
    },
    { 
      label: 'À propos', 
      path: 'about', 
      icon: 'person',
      description: 'En savoir plus sur moi'
    },
    { 
      label: 'Contact', 
      path: 'contact', 
      icon: 'mail',
      description: 'Prenons contact'
    }
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }

  navigateAndClose(path: string): void {
    this.router.navigate([path]);
    this.isMenuOpen = false;
  }

  setHoveredItem(item: NavItem | null): void {
    this.hoveredItem = item;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}