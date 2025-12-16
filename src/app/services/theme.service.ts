import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('dark');
  public theme$ = this.themeSubject.asObservable();

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    // Vérifier si nous sommes dans un environnement navigateur
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      // Récupérer le thème sauvegardé ou utiliser le thème sombre par défaut
      const savedTheme = localStorage.getItem('theme') as Theme;
      const theme = savedTheme || 'dark';
      
      this.setTheme(theme);
    } else {
      // Fallback pour le SSR
      this.setTheme('dark');
    }
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    
    // Sauvegarder dans localStorage seulement si disponible
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
    
    // Appliquer le thème au document seulement si document est disponible
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  isDarkMode(): boolean {
    return this.getCurrentTheme() === 'dark';
  }
} 