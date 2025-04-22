import { Routes } from '@angular/router';
import { TaskComponent } from './components/task/task.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      { path: 'tasks', component: TaskComponent, outlet: 'dashboard' },
      { path: 'profile', component: ProfileComponent, outlet: 'dashboard' }
    ], 
  },
];