import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatUnit',
  standalone: true,
})
export class FormatUnitPipe implements PipeTransform {
  transform(value: number, unit: 'weight' | 'height'): string {
    if (unit === 'height') {
      const meters = (value * 0.1).toFixed(1);
      const inches =
        Math.floor(+meters * 3.2808) +
        '"' +
        Math.round(((+meters * 3.2808) % 1) * 12) +
        "'";

      return `${meters}m ( ${inches} )`;
    }

    if (unit === 'weight') {
      const kgs = (value * 0.1).toFixed(1);
      const pounds = (+kgs * 2.205).toFixed(1);

      return `${kgs}kg ( ${pounds}lbs )`;
    }

    return '';
  }
}
