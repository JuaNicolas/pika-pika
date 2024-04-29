import { Injectable, inject } from '@angular/core';
import { Pokedex } from 'pokeapi-js-wrapper';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  catchError,
  delay,
  finalize,
  from,
  map,
  of,
  tap,
} from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly pokedex = new Pokedex({
    cache: true,
    timeout: 5 * 1000, // 5s
  });

  private readonly _pokemonColor = new BehaviorSubject<string>('');
  readonly pokemonColor$ = this._pokemonColor.asObservable();

  private readonly loadingService = inject(LoadingService);

  getPokemons() {
    return this.addLoading(
      from(this.pokedex.getPokemonsList()).pipe(
        map(({ count, next, previous, results }) => ({
          count,
          next,
          previous,
          results: results.map(({ name, url }) => ({
            name,
            url,
            id: +url.split('/')[6],
          })),
        }))
      )
    );
  }

  obtainPokemonDetails(name: string) {
    return this.addLoading(from(this.pokedex.getPokemonByName(name)));
  }

  pokemonMetadata(
    pokemon: string
  ): Observable<{ color: string; title: string; subtitle: string }> {
    return this.addLoading(
      from(this.pokedex.getPokemonSpeciesByName(pokemon)).pipe(
        map((p) => ({
          color: p.color.name,
          title: p.name,
          subtitle: p.genera.find((g) => g.language.name === 'en')?.genus ?? '',
        })),
        tap(({ color }) => this._pokemonColor.next(color))
      )
    );
  }

  private addLoading<T>(obs: Observable<T>): Observable<T> {
    this.loadingService.show();
    return obs.pipe(
      catchError(() => EMPTY),
      delay(500),
      finalize(() => this.loadingService.hide())
    );
  }
}
