import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { List } from '../models/list.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  getPokemons(): Observable<List> {
    return this.httpClient.get<List>(`${environment.APY_URL}/pokemon`);
  }
}
