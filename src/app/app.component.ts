import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  selector: 'app-root',
  template: `<app-header></app-header>
    <router-outlet></router-outlet> `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'poke-api';
}
