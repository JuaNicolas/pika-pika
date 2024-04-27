import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, SearchComponent],
  template: `
    <app-search></app-search>

    <div class="row">
      @for (product of results$ | async; track product.name) {

      <app-pokemon-card
        [name]="product.name"
        [url]="product.url"
        [id]="product.id"
      ></app-pokemon-card>
      } @empty {
      <p>No products added yet!</p>
      }
    </div>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  results$ = this.apiService.getPokemons().pipe(map((r) => r.results));

  constructor(private readonly apiService: ApiService) {}
}
