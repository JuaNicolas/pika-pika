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
    <input
      #searchInput
      class="form-control"
      type="text"
      placeholder="Search Pokémon"
      aria-label="Search Pokémon"
    />
  `,
  styles: `
  :host {
    display:block;
  }
  `,
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
}
