import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'pokemon/:name',
    loadComponent: () =>
      import('./pages/detail/detail.component').then((c) => c.DetailComponent),
  },
];
