import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('app/features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('app/features/posts/posts.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
