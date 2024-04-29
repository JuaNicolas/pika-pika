import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Pokemon } from 'pokeapi-js-wrapper';
import { Observable, forkJoin } from 'rxjs';
import { GalleryDirective } from 'src/app/directives/gallery.directive';
import { ExtractDetailPipe } from 'src/app/pipes/extract-detail.pipe';
import { FormatTableStatKeyPipe } from 'src/app/pipes/format-table-stat-key.pipe';
import { FormatUnitPipe } from 'src/app/pipes/format-unit.pipe';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    ExtractDetailPipe,
    GalleryDirective,
    FormatUnitPipe,
    FormatTableStatKeyPipe,
  ],
  template: `
    @if (vm$ | async; as vm;) {

    <div [ngClass]="'container-' + vm.metadata.color">
      <div class="picture" [ngClass]="vm.metadata.color">
        <span>#{{ vm.pokemon.id }}</span>
        <img
          appGallery
          class="img-fluid"
          [pokemon]="vm.pokemon"
          height="250"
          width="250"
        />
      </div>

      <div class="title-container text-center pt-4">
        <h1>{{ vm.metadata.title | uppercase }}</h1>
        <h2 [ngClass]="'container-' + vm.metadata.color">
          {{ vm.metadata.subtitle | lowercase }}
        </h2>
      </div>

      <div class="type-container d-flex justify-content-center p-4">
        @for (type of vm.pokemon | extractDetail : 'types'; track $index) {

        <div [ngClass]="type" class="type-pill text-capitalize py-2 px-3">
          <span class="text-white">
            {{ type }}
          </span>
          <span>
            <img
              class="img-fluid"
              [src]="'assets/icons/' + type + '.png'"
              [alt]="type"
              height="18"
              width="18"
            />
          </span>
        </div>
        }
      </div>

      <div class="data-container mt-3">
        <div class="data-line">
          <span class="data-title">
            <i class="fa-solid fa-ruler"></i> Height</span
          >
          <span class="text-nowrap">
            {{ vm.pokemon.height | formatUnit : 'height' }}
          </span>
        </div>
        <div class="data-line">
          <span class="data-title"
            ><i class="fa-solid fa-weight-hanging"></i> Weight</span
          >
          <span class="text-nowrap">
            {{ vm.pokemon.weight | formatUnit : 'weight' }}
          </span>
        </div>
        <div class="data-line">
          <span class="data-title">
            <i class="fa-solid fa-bolt"></i> Abilities</span
          >

          <span class="text-nowrap">
            @for (ability of vm.pokemon | extractDetail : 'abilities'; track
            $index) {
            <span class="ability">
              {{ ability | titlecase }}
            </span>
            }
          </span>
        </div>
      </div>

      <div class="stats-container pt-3 pb-5 container">
        <div class="stats-title text-center">
          <i class="fa-solid fa-chart-simple"></i>
          Stats
        </div>

        <div class="stats-table">
          @for (stat of vm.pokemon.stats | keyvalue; track $index) {

          <div class="stats-row">
            {{ vm.pokemon.stats[$index].stat.name | formatTableStatKey }}
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated rounded-sm"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                [ngClass]="vm.metadata.color"
                [ngStyle]="{
                  'width.%': vm.pokemon.stats[$index].base_stat,
                }"
              >
                <span>{{ vm.pokemon.stats[$index].base_stat }} %</span>
              </div>
            </div>
          </div>

          }
        </div>
      </div>
    </div>
    } @else {
    <div class="pokeball-container">
      <span>This Pokémon escaped! Better luck next time!</span>
      <img
        class="pokeball"
        src="assets/pokeball.png"
        alt="Pokeball"
        height="128px"
        width="128px"
      />
    </div>
    }
  `,
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  private readonly apiService = inject(ApiService);

  @Input() name = '';

  vm$!: Observable<{
    pokemon: Pokemon;
    metadata: { color: string; title: string; subtitle: string };
  }>;

  ngOnInit(): void {
    this.vm$ = forkJoin({
      pokemon: this.apiService.obtainPokemonDetails(this.name),
      metadata: this.apiService.pokemonMetadata(this.name),
    });
  }
}
