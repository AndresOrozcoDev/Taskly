import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forget-form.component.html',
  styleUrl: './forget-form.component.scss'
})
export class ForgetFormComponent {

  constructor(private router: Router) { }

  submitted = false;
  forgetForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  onSend() {
    if (this.forgetForm.valid) {
      console.info(this.forgetForm.value);
      this.router.navigate(['/home']);
    } else {
      this.submitted = true;
      console.error('Empty form!');
    }
  }
}
