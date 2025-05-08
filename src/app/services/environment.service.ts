import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private env: { [key: string]: string } = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // En mode navigateur, on utilise window.__env
      this.env = (window as any).__env || {};
    }
  }

  getValue(key: string): string {
    return this.env[key] || '';
  }
} 