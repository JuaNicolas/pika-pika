import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  template: `
    <mat-form-field>
      <mat-label>Search Pokémon</mat-label>
      <input matInput type="text" />
      @if (value) {
      <button matSuffix mat-icon-button aria-label="Clear" (click)="value = ''">
        <mat-icon>close</mat-icon>
      </button>
      }
    </mat-form-field>
  `,
  styles: ``,
})
export class SearchComponent implements OnInit {
  @ViewChild(MatInput, { static: true, read: ElementRef })
  searchInput!: ElementRef<HTMLInputElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly apiService = inject(ApiService);

  value = '';

  ngOnInit(): void {
    fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((v) => (v.target as HTMLInputElement).value),
        debounceTime(250),
        distinctUntilChanged()
      )
      .subscribe((v) => this.apiService.notifySearchParam(v));
    console.log(this.searchInput.nativeElement.value);
  }
}
