import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  selector: 'app-root',
  template: `<app-header></app-header>
    <div class="container">
      <router-outlet></router-outlet>
    </div> `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'poke-api';
}
