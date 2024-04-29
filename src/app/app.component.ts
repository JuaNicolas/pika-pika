import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoadingService } from './services/loading.service';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, CommonModule],
  selector: 'app-root',
  template: `
    @if (isLoading$ |async) {
    <div class="loading-container">
      <span> Gotta cath 'em all! </span>

      <div class="pokeball-container">
        @for (pokeball of [0,1,2] ; track $index){

        <img
          [ngClass]="'pokeball-' + pokeball"
          src="assets/pokeball.png"
          alt="Pokeball"
          height="128px"
          width="128px"
        />

        }
      </div>
    </div>

    }

    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'poke-api';

  isLoading$ = this.loadingService.loading$;
  constructor(private readonly loadingService: LoadingService) {}
}
