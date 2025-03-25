import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  submitted = false;
  @Output() formData = new EventEmitter<any>();

  constructor(private translate: TranslateService) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

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
