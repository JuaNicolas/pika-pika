import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { Pokemon } from 'pokeapi-js-wrapper';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  template: `<p>detail works!</p>

    <pre>{{ pokemon$ | async | json }}</pre>`,
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  @Input() name = '';

  private readonly apiService = inject(ApiService);
  pokemon$!: Observable<Pokemon>;

  ngOnInit(): void {
    this.pokemon$ = this.apiService.obtainPokemonDetails(this.name);
  }
}
