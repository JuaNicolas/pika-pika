import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';

@Pipe({
  name: 'pokeImage',
  standalone: true,
})
export class PokeImagePipe implements PipeTransform {
  transform(pokemonID: number, position: '' | 'back' = ''): string {
    if (position) {
      return `${environment.DEFAULT_FRONT_IMAGE}/${pokemonID}/${position}.${environment.DEFAULT_IMAGE_EXT}`;
    }

    return `${environment.DEFAULT_FRONT_IMAGE}/${pokemonID}.${environment.DEFAULT_IMAGE_EXT}`;
  }
}
