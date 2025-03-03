import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
    },
    {
      path: 'home',
      loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
    },
    { path: '**', redirectTo: '' },
  ];;
