import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokeImagePipe } from 'src/app/pipes/pokeImage.pipe';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, PokeImagePipe, NgOptimizedImage, RouterModule],
  template: `
    <div class="card">
      <img
        class="rounded mx-auto d-block"
        [ngSrc]="id | pokeImage"
        [alt]="name"
        height="96"
        width="96"
      />
      <div class="card-body text-center">
        <h5 class="card-title">#{{ id }} {{ name | titlecase }}</h5>
      </div>
      <div class="card-footer text-center">
        <a [routerLink]="['pokemon', name]" class="card-link link-info"
          >Details</a
        >
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
}
