import { CommonModule } from '@angular/common';
import { User } from '../../utils/models/auth.models';
import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  submitted = false;
  loginForm!: FormGroup;
  @Output() formData = new EventEmitter<User>();

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const lang = localStorage.getItem('language') || 'es';
    this.translate.use(lang);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.formData.emit(this.loginForm.value);
    } else {
      this.submitted = true;
      console.error('Empty form!');
    }
  }

}
