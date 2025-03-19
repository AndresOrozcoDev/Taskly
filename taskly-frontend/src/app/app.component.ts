import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './utils/components/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
