import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface FooterLink {
  label: string;
  path: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule]
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();

  readonly sections: FooterSection[] = [
    {
      title: 'Navigation',
      links: [
        { label: 'Accueil', path: '/home' },
        { label: 'Projets', path: '/projects' },
        { label: 'Compétences', path: '/skills' },
        { label: 'À propos', path: '/about' },
        { label: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Développement Web', path: '/services/web' },
        { label: 'Applications Mobile', path: '/services/mobile' },
        { label: 'Design UI/UX', path: '/services/design' },
        { label: 'Conseil Tech', path: '/services/consulting' }
      ]
    },
    {
      title: 'Légal',
      links: [
        { label: 'Mentions légales', path: '/legal/mentions' },
        { label: 'Politique de confidentialité', path: '/legal/privacy' },
        { label: 'CGU', path: '/legal/terms' },
      ]
    }
  ];

  readonly socialLinks: SocialLink[] = [
    { platform: 'GitHub', url: 'https://github.com/EMMADEKO10', icon: 'code' },
    // { platform: 'LinkedIn', url: 'https://linkedin.com/', icon: 'business' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/emmanuel-deko-0581561a0/', icon: 'business' },
    { platform: 'Twitter', url: 'https://x.com/DekoEmmanuel09', icon: 'thumb_up' }
  ];

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}