import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, SearchComponent],
  template: `
    <div class="container">
      <div class="row justify-content-center py-5">
        <app-search [searchParam]="searchParam$"></app-search>
      </div>

      <div class="row pb-5">
        @for (pokemon of vm$ | async; track pokemon.name) {
        <app-pokemon-card
          class="col-12 col-md-4 col-lg-3 g-3"
          [name]="pokemon.name"
          [url]="pokemon.url"
          [id]="pokemon.id"
        ></app-pokemon-card>
        } @empty {

        <div class="pokeball-container">
          <span>Oh no! There are no Pokemon in this area!</span>
          <img
            class="pokeball"
            src="assets/pokeball.png"
            alt="Pokeball"
            height="128px"
            width="128px"
          />
        </div>
        }
      </div>
    </div>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly searchParam$ = new BehaviorSubject<string>('');

  readonly vm$ = combineLatest([
    this.apiService.getPokemons().pipe(map((r) => r.results)),
    this.searchParam$.pipe(map((v) => v.toLowerCase())),
  ]).pipe(
    map(([pokemons, searchTerm]) =>
      pokemons.filter((p) => p.name.includes(searchTerm))
    )
  );

  constructor(private readonly apiService: ApiService) {}
}
