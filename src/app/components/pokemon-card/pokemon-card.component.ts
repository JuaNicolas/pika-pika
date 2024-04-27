import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeImagePipe } from 'src/app/pipes/pokeImage.pipe';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, PokeImagePipe],
  template: `{{ name }}
    {{ url }}
    <img [src]="id | pokeImage" [alt]="name" alt="96" width="96" /> `,
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input({ required: true })
  name!: string;

  @Input({ required: true })
  url!: string;

  @Input({ required: true })
  id!: number;
}
