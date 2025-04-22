import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { LucideAngularModule, Archive, Sun, LogOut, AlignJustify, CircleUserRound, Globe } from 'lucide-angular';

@Component({
  selector: 'app-aside',
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslateModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  currentLang = signal(localStorage.getItem('language') || 'en');
  @Input() rol!: string;
  @Output() onLogout = new EventEmitter<boolean>();
  isOpen = false;
  readonly icons = {
    archive: Archive,
    sun: Sun,
    logOut: LogOut,
    menu: AlignJustify,
    profile: CircleUserRound,
    globe: Globe,
  };

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.onLogout.emit(true);
  }

  toggleLanguage() {
    const newLang = this.currentLang() === 'en' ? 'es' : 'en';
    this.currentLang.set(newLang);
    this.translate.use(newLang);
    localStorage.setItem('language', newLang);
  }
}
