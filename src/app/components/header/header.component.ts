import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterEvent, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar sticky-top">
      @if (displayBack$ | async ; as bool) {
      <a class="arrow" [routerLink]="['/']" [ngClass]="color$ | async">
        <i class="fa-solid fa-arrow-left"></i>
      </a>
      }
      <a class="logo" [routerLink]="['/']">
        <img src="/assets/pokeapi.png" alt="Gotta catch 'em all!" />
      </a>
    </nav>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly color$ = this.apiService.pokemonColor$;
  readonly displayBack$ = this.router.events.pipe(
    filter((e: any) => e instanceof RouterEvent),
    map((value: RouterEvent) => value.url !== '/')
  );

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {}
}
