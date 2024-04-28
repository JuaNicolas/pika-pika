import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar sticky-top" [ngClass]="color$ | async">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="/assets/pokeapi.png" alt="Gotta catch 'em all!"
        /></a>
      </div>
    </nav>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly color$ = this.apiService.pokemonColor$;
  constructor(private readonly apiService: ApiService) {}
}
