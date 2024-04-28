import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from 'pokeapi-js-wrapper';

@Pipe({
  name: 'extractDetail',
  standalone: true,
})
export class ExtractDetailPipe implements PipeTransform {
  transform(pokemon: Pokemon, stat: 'abilities' | 'types'): string[] {
    if (stat === 'abilities') {
      return pokemon[stat].map((k) => k.ability.name);
    }

    return pokemon[stat].map((k) => k.type.name);
  }
}
