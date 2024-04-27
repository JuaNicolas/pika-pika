import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="row">
      <div class="col-3">
        <input
          class="form-control"
          type="text"
          placeholder="Search Pokémon"
          aria-label="Search Pokémon"
        />
      </div>
    </div>
  `,
  styles: ``,
})
export class SearchComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly apiService = inject(ApiService);

  value = '';

  // ngOnInit(): void {
  //   fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup')
  //     .pipe(
  //       takeUntilDestroyed(this.destroyRef),
  //       map((v) => (v.target as HTMLInputElement).value),
  //       debounceTime(250),
  //       distinctUntilChanged()
  //     )
  //     .subscribe((v) => this.apiService.notifySearchParam(v));
  // }

  // handleClear() {
  //   this.searchInput.nativeElement.value = '';
  //   this.apiService.notifySearchParam('');
  // }
}
