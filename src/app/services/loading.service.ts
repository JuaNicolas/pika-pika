import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly loadingSub: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  readonly loading$: Observable<boolean> = this.loadingSub.asObservable();

  show() {
    this.loadingSub.next(true);
  }

  hide() {
    this.loadingSub.next(false);
  }
}
