import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.prod';

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
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getNews(): Observable<Article[]> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get<Article[]>(this.apiUrl, { headers })
      .pipe(
        catchError(error => {
          console.error('Erreur détaillée:', error);
          return throwError(() => new Error('Erreur lors de la récupération des actualités'));
        })
      );
  }
} 