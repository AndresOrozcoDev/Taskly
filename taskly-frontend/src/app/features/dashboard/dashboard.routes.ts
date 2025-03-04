import { Routes } from '@angular/router';
import { TaskComponent } from './components/task/task.component';
import { TestComponent } from './components/test/test.component';
import { HomeComponent } from './pages/home/home.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      { path: 'tasks', component: TaskComponent, outlet: 'dashboard' },
      { path: 'test', component: TestComponent, outlet: 'dashboard' }
    ], 
  },
];