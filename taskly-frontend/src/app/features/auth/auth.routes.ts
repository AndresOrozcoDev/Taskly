import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
];