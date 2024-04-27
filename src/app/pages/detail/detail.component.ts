import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  template: `<p>detail works!</p>`,
  styleUrl: './detail.component.scss',
})
export class DetailComponent {}
