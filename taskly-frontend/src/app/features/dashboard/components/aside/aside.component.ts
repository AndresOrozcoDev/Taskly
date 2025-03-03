import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Archive } from 'lucide-angular';

@Component({
  selector: 'app-aside',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  isOpen = false;
  readonly archive = Archive;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
