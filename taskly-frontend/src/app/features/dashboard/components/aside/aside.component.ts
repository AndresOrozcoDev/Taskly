import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Archive, Sun, LogOut, AlignJustify, CircleUserRound } from 'lucide-angular';

@Component({
  selector: 'app-aside',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  isOpen = false;
  readonly icons = {
    archive: Archive,
    sun: Sun,
    logOut: LogOut,
    menu: AlignJustify,
    profile: CircleUserRound
  };

  constructor(private router: Router) { }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.router.navigate(['/']);
  }
}
