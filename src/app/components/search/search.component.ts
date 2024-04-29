import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-light rounded rounded-pill shadow-sm align-content-center">
      <div class="input-group rounded-pill">
        <input
          #searchInput
          autocomplete="false"
          type="text"
          class="form-control border-0 rounded-pill"
          placeholder="Search Pokémon"
          aria-label="Search Pokémon"
        />

        <div class="input-group-append">
          @if (searchInput.value) {
          <button class="btn btn-link text-primary" (click)="handleClear()">
            <i class="bi bi-x"></i>
          </button>
          }@else {

          <button
            class="btn btn-link text-primary"
            (click)="searchInput.focus()"
          >
            <i class="bi bi-search"></i>
          </button>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './search.component.scss',
})
export class SearchComponent implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);

  @Input({ required: true })
  searchParam!: Subject<string>;

  @ViewChild('searchInput')
  searchInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((v) => (v.target as HTMLInputElement).value),
        debounceTime(250),
        distinctUntilChanged()
      )
      .subscribe((v) => this.searchParam.next(v));
  }

  handleClear() {
    this.searchInput.nativeElement.value = '';
    this.searchParam.next('');
  }
}
