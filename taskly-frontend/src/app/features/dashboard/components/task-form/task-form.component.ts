import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../utils/models';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {

  submitted = false;
  @Output() formData = new EventEmitter<any>();
  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  constructor(private translate: TranslateService, private taskServices: TaskService) { }

  ngOnInit(): void {
    const lang = localStorage.getItem('language') || 'es';
    this.translate.use(lang);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.formData.emit(this.taskForm.value);
    } else {
      this.submitted = true;
      console.error('Empty form!');
    }
  }

}
