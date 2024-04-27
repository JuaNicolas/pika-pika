import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar sticky-top navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="/assets/pokeapi.png" alt="Gotta catch 'em all!"
        /></a>
      </div>
    </nav>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
