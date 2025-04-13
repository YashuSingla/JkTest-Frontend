import { Routes } from '@angular/router';
import { authGuard } from 'app/core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./create-post/create-post.component').then((m) => m.CreatePostComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./post-detail/post-detail.component').then((m) => m.PostDetailComponent),
  },
];
