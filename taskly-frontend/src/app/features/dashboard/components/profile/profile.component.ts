import { Component } from '@angular/core';
import { LucideAngularModule, Construction } from 'lucide-angular';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  readonly icons = {
    construction: Construction,
  }
}
