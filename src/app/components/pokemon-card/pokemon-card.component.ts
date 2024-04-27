import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  template: `{{ name }}
    {{ url }} `,
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input({ required: true })
  name!: string;

  @Input({ required: true })
  url!: string;
}
