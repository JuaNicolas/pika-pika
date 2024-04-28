import { Injectable } from '@angular/core';
import { Pokedex } from 'pokeapi-js-wrapper';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly pokedex = new Pokedex({
    versionPath: '/api/v2/',
    cache: true,
    timeout: 5 * 1000, // 5s
    cacheImages: true,
  });

  getPokemons() {
    return from(this.pokedex.getPokemonsList()).pipe(
      map(({ count, next, previous, results }) => ({
        count,
        next,
        previous,
        results: results
          .map(({ name, url }) => ({
            name,
            url,
            id: +url.split('/')[6],
          }))
          .slice(0, 20),
      }))
    );
  }

  obtainPokemonDetails(name: string) {
    return from(this.pokedex.getPokemonByName(name));
  }
}
