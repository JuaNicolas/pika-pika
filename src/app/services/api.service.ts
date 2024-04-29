import { Injectable } from '@angular/core';
import { Pokedex } from 'pokeapi-js-wrapper';
import { BehaviorSubject, Observable, from, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly pokedex = new Pokedex({
    cache: true,
    timeout: 5 * 1000, // 5s
  });

  private readonly _pokemonColor = new BehaviorSubject<string>('navbar');
  readonly pokemonColor$ = this._pokemonColor.asObservable();

  getPokemons() {
    return from(this.pokedex.getPokemonsList()).pipe(
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
    );
  }

  obtainPokemonDetails(name: string) {
    return from(this.pokedex.getPokemonByName(name));
  }

  pokemonMetadata(
    pokemon: string
  ): Observable<{ color: string; title: string; subtitle: string }> {
    return from(this.pokedex.getPokemonSpeciesByName(pokemon)).pipe(
      map((p) => ({
        color: p.color.name,
        title: p.name,
        subtitle: p.genera.find((g) => g.language.name === 'en')?.genus ?? '',
      })),
      tap(({ color }) => this._pokemonColor.next(color))
    );
  }
}
