import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokeImagePipe } from 'src/app/pipes/pokeImage.pipe';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, PokeImagePipe, NgOptimizedImage, RouterModule],
  template: `
    <div
      class="card"
      [routerLink]="['pokemon', name]"
      [attr.data-cy]="name"
    >
      <div class="ps-3 pt-3"># {{ id }}</div>
      <img
        class="mx-auto"
        [ngSrc]="id | pokeImage"
        [alt]="name"
        (error)="onImgError($event)"
        height="96"
        width="96"
      />
      <div class="card-body text-center">
        <h5 class="card-title">{{ name | titlecase }}</h5>
      </div>
    </div>
  `,
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input({ required: true })
  name!: string;

  @Input({ required: true })
  url!: string;

  @Input({ required: true })
  id!: number;

  onImgError(e: Event) {
    (e.target as HTMLImageElement).src = '/assets/pokeball.png';
  }
}
