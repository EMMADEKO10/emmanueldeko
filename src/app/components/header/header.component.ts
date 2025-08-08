import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, ThemeToggleComponent],
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
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  hoveredItem: any = null;
  isDarkMode = true;
  private themeSubscription: Subscription;

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

  constructor(private router: Router, private themeService: ThemeService) {
    this.themeSubscription = new Subscription();
  }

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

  ngOnInit(): void {
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}