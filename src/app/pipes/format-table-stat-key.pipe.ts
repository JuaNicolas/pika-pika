import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTableStatKey',
  standalone: true,
})
export class FormatTableStatKeyPipe implements PipeTransform {
  transform(
    value:
      | 'hp'
      | 'attack'
      | 'defense'
      | 'special-attack'
      | 'special-defense'
      | 'speed'
      | string
  ): string {
    if (value === 'hp') {
      return 'Health Points';
    }
    if (value === 'attack') {
      return 'Attack';
    }
    if (value === 'defense') {
      return 'Defense';
    }
    if (value === 'special-attack') {
      return 'Special Attack';
    }
    if (value === 'special-defense') {
      return 'Special Defense';
    }

    if (value === 'speed') {
      return 'Speed';
    }

    return '';
  }
}
