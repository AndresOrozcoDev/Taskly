import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  constructor(private router: Router) { }

  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    retryPassword: new FormControl('', Validators.required),
  });

  onRegister() {
    if (this.registerForm.valid) {
      console.info(this.registerForm.value);
      this.router.navigate(['/home']);
    } else {
      console.error('Empty form!');
    }
  }
}
