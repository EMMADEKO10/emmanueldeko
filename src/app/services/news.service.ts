import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { EnvironmentService } from './environment.service';

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private envService: EnvironmentService
  ) {
    this.apiUrl = this.envService.getValue('API_URL') || 'https://api.votre-domaine.com/api/news';
  }

  getNews(): Observable<Article[]> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get<Article[]>(this.apiUrl, { headers })
      .pipe(
        catchError(error => {
          console.error('Erreur détaillée:', error);
          // Retourner un tableau vide en cas d'erreur
          return of([]);
        })
      );
  }
} 