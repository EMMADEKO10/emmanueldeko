import { Component, HostListener, inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
    trigger('headerAnimation', [
      state('expanded', style({
        height: '4.5rem',
        backgroundColor: 'transparent'
      })),
      state('collapsed', style({
        height: '4rem',
        backgroundColor: 'rgba(17, 24, 39, 0.95)'
      })),
      transition('expanded <=> collapsed', animate('200ms ease-in-out')),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-8px)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-8px)' }))
      ])
    ]),
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
export class HeaderComponent implements AfterViewInit {
  @ViewChild('headerElement') headerElement!: ElementRef;
  
  private router = inject(Router);
  isHeaderCollapsed = false;
  isMobileMenuOpen = false;
  lastScrollPosition = 0;
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

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollPosition = window.scrollY;
    this.isHeaderCollapsed = scrollPosition > 20;
    this.lastScrollPosition = scrollPosition;

    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 1024 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  @HostListener('window:keydown.escape')
  onEscapePress(): void {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  ngAfterViewInit(): void {
    this.initScrollBehavior();
  }

  private initScrollBehavior(): void {
    if (!this.headerElement?.nativeElement) return;
    
    const header = this.headerElement.nativeElement;
    let lastScroll = 0;

    const scrollHandler = () => {
      const currentScroll = window.scrollY;
      const shouldHide = currentScroll > lastScroll && currentScroll > 100;
      
      header.style.transform = shouldHide ? 'translateY(-100%)' : 'translateY(0)';
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }

  navigateAndClose(path: string): void {
    this.router.navigate([path]);
    this.closeMobileMenu();
  }

  setHoveredItem(item: NavItem | null): void {
    this.hoveredItem = item;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}