import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forget-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  templateUrl: './forget-form.component.html',
  styleUrl: './forget-form.component.scss'
})
export class ForgetFormComponent {

  constructor(private router: Router, private translate: TranslateService) { }

  submitted = false;
  forgetForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    const lang = localStorage.getItem('language') || 'es';
    this.translate.use(lang);
  }

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
