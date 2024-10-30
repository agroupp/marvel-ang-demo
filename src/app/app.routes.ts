import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'characters',
    loadComponent: async () =>
      (await import('./characters-feature/characters-feature.component')).CharactersFeatureComponent,
  },
  {
    path: 'characters-new',
    loadComponent: async () =>
      (await import('./characters-feature-new/characters-feature-new.component')).CharactersFeatureNewComponent,
  },
];
