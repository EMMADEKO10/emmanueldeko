import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { NewsService, Article } from '../services/news.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actualite',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule
  ],
  providers: [NewsService],
  templateUrl: './actualite.component.html',
  styleUrl: './actualite.component.css',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ActualiteComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  private subscription?: Subscription;
  error: string = '';
  loading: boolean = true;

  constructor(
    private newsService: NewsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.loading = true;
    this.error = '';
    this.subscription = this.newsService.getNews().subscribe({
      next: (articles) => {
        this.articles = articles;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des actualités:', error);
        this.error = error.message || 'Une erreur est survenue';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
