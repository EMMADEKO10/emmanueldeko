import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  animations: [
    trigger('shrinkHeader', [
      state('initial', style({
        height: '80px',
        padding: '20px'
      })),
      state('shrunk', style({
        height: '60px',
        padding: '10px'
      })),
      transition('initial <=> shrunk', animate('300ms ease-in-out'))
    ])
  ]
})
export class HeaderComponent {
  isHeaderShrunk = false;
  isMobileMenuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isHeaderShrunk = scrollPosition > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}

