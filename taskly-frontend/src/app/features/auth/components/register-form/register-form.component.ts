import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  submitted = false;
  registerForm!: FormGroup;
  @Output() formData = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const lang = localStorage.getItem('language') || 'es';
    this.translate.use(lang);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.formData.emit(this.registerForm.value);
    } else {
      this.submitted = true;
      console.error('Empty form!');
    }
  }

}
