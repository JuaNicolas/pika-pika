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
    <h1>{{ vm.metadata.title | uppercase }}</h1>
    <h2>{{ vm.metadata.subtitle }}</h2>

    <table
      class="table table-borderless"
      [ngClass]="'table-' + vm.metadata.color"
    >
      <tbody>
        <tr>
          <td class="text-end fw-bold">ID</td>
          <td>#{{ vm.pokemon.id }}</td>
        </tr>
        <tr>
          <td class="text-end fw-bold">Height</td>
          <td class="text-nowrap">
            {{ vm.pokemon.height | formatUnit : 'height' }}
          </td>
        </tr>
        <tr>
          <td class="text-end fw-bold">Weight</td>
          <td class="text-nowrap">
            {{ vm.pokemon.weight | formatUnit : 'weight' }}
          </td>
        </tr>

        <tr>
          <td class="text-end fw-bold">Abilities</td>

          <td class="text-nowrap">
            @for (ability of vm.pokemon | extractDetail : 'abilities'; track
            $index) {
            {{ ability }}
            }
          </td>
        </tr>

        <tr>
          <td class="text-end fw-bold">Types</td>

          <td class="text-nowrap">
            <div class="row flex-nowrap">
              @for (type of vm.pokemon | extractDetail : 'types'; track $index)
              {

              <div [ngClass]="type" class="row icon text-capitalize p-0">
                <span class="col-8 text-white">
                  {{ type }}
                </span>
                <span class="col-4">
                  <img
                    class="img-fluid"
                    [src]="'assets/icons/' + type + '.png'"
                    [alt]="type"
                  />
                </span>
              </div>
              }
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <img appGallery [pokemon]="vm.pokemon" />

    <table
      class="table table-borderless"
      [ngClass]="'table-' + vm.metadata.color"
    >
      <tbody>
        @for (stat of vm.pokemon.stats | keyvalue; track $index) {

        <tr>
          <td class="text-end fw-bold">
            {{ vm.pokemon.stats[$index].stat.name | formatTableStatKey }}
          </td>
          <td class="text-nowrap">
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated rounded-sm"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                [ngClass]="vm.metadata.color"
                [ngStyle]="{ 'width.%': vm.pokemon.stats[$index].base_stat }"
              >
                <span>{{ vm.pokemon.stats[$index].base_stat }}</span>
              </div>
            </div>
          </td>
        </tr>
        }
      </tbody>
    </table>
    } @else {
    <p>The profile doesn't exist!</p>
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
