import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {

  submitted = false;
  taskForm!: FormGroup;
  @Output() formData = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/)]],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });
   }

  ngOnInit(): void {
    const lang = localStorage.getItem('language') || 'es';
    this.translate.use(lang);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.formData.emit(this.taskForm.value);
      this.taskForm.reset();
    } else {
      this.submitted = true;
      console.error('Invalid form!');
    }
  }

}
