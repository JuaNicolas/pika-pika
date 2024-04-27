import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],
  template: `
    @for (product of results$ | async; track product.name) {
    <app-pokemon-card
      [name]="product.name"
      [url]="product.url"
      [id]="product.id"
    ></app-pokemon-card>
    } @empty {
    <p>No products added yet!</p>
    }
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  results$ = this.apiService.getPokemons().pipe(map((r) => r.results));

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPokemons().subscribe(console.log);
  }
}
