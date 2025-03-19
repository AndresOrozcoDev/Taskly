import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  constructor(private taskServices: TaskService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.taskServices.getTasks().subscribe(
      (response) => { console.log(response); },
      (error) => { console.error('Error al obtener las tareas', error); }
    );
  }
}
