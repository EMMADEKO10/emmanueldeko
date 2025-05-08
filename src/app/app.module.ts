import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { EnvironmentService } from './services/environment.service';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AppComponent,
    AboutComponent
  ],
  providers: [EnvironmentService]
})
export class AppModule { }