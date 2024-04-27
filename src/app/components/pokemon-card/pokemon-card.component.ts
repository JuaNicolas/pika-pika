import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeImagePipe } from 'src/app/pipes/pokeImage.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, PokeImagePipe, MatCardModule, MatButtonModule],
  template: `
    <mat-card class="example-card">
      <mat-card-header>
        <img
          mat-card-avatar
          mat-card-image
          [src]="id | pokeImage"
          [alt]="name"
        />
        <mat-card-title> {{ name | titlecase }} </mat-card-title>
      </mat-card-header>
      <img
        mat-card-image
        [src]="id | pokeImage"
        [alt]="name"
        alt="96"
        width="96"
      />
      <mat-card-actions>
        <button mat-button>Details</button>
      </mat-card-actions>
    </mat-card>
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
