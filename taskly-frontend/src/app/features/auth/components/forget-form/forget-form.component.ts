import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Email } from '../../utils/models/auth.models';
import { LucideAngularModule, Copy } from 'lucide-angular';

@Component({
  selector: 'app-forget-form',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, RouterModule, TranslateModule],
  templateUrl: './forget-form.component.html',
  styleUrl: './forget-form.component.scss'
})
export class ForgetFormComponent implements OnChanges {

  @Output() formData = new EventEmitter<Email>();
  readonly icons = {
    copy: Copy
  };

  constructor(private translate: TranslateService, private router: Router) { }

  @Input() newPassword!: string;
  submitted = false;
  forgetForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    const lang = localStorage.getItem('language') || 'es';
    this.translate.use(lang);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newPassword'] && changes['newPassword'].currentValue) {
      this.handleNewPasswordChange(changes['newPassword'].currentValue);
    }
  }

  onSend() {
    if (this.forgetForm.valid) {
      this.formData.emit(this.forgetForm.value);
    } else {
      this.submitted = true;
      console.error('Empty form!');
    }
  }

  onCopy(): void {
    if (this.newPassword) {
      navigator.clipboard.writeText(this.newPassword)
        .then(() => {
          console.log('Contraseña copiada al portapapeles:', this.newPassword);
        })
        .catch(err => {
          console.error('Error al copiar al portapapeles:', err);
        });
    }
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  handleNewPasswordChange(newPassword: string): void {
    console.log('Nueva contraseña recibida:', newPassword);
  }

}
