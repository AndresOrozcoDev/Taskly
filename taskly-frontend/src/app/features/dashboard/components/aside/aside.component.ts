import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule, Archive, Sun, LogOut, AlignJustify, CircleUserRound, Globe } from 'lucide-angular';

@Component({
  selector: 'app-aside',
  imports: [RouterModule, LucideAngularModule, TranslateModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  currentLang = signal(localStorage.getItem('language') || 'en');
  isOpen = false;
  readonly icons = {
    archive: Archive,
    sun: Sun,
    logOut: LogOut,
    menu: AlignJustify,
    profile: CircleUserRound,
    globe: Globe,
  };

  constructor(private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.router.navigate(['/']);
  }

  toggleLanguage() {
    const newLang = this.currentLang() === 'en' ? 'es' : 'en';
    this.currentLang.set(newLang);
    this.translate.use(newLang);
    localStorage.setItem('language', newLang);
  }
}
