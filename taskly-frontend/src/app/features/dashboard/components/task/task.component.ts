import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../utils/models';
import { LoadingService } from '../../../../utils/services/loading.service';
import { lastValueFrom } from 'rxjs';
import { LucideAngularModule, Plus, Clock, Loader, CircleCheck, Trash } from 'lucide-angular';
import { ModalComponent } from '../../../../utils/components/modal/modal.component';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task',
  imports: [CommonModule, LucideAngularModule, ModalComponent, TaskFormComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  tasks: Task[] = [];
  readonly icons = {
    plus: Plus,
    pending: Clock,
    progress: Loader,
    completed: CircleCheck,
    trash: Trash
  };
  showModal: boolean = false;

  constructor(private taskServices: TaskService, private loadingServices: LoadingService) { }

  ngOnInit() {
    this.getAll();
  }

  async getAll() {
    try {
      this.loadingServices.show();
      this.tasks = await lastValueFrom(this.taskServices.getTasks());
    } catch (error) {
      console.error('Error al obtener las tareas', error);
    } finally {
      this.loadingServices.hide();
    }
  }

  async onCreate(task: Task) {
    if (task) {
      let dataTask = this.handleData(task);
      this.loadingServices.show();
      const response = await this.taskServices.postTask(dataTask).subscribe(
        (response) => {
          this.loadingServices.hide();
          this.closeModal();
          this.getAll();
        },
        (error) => { 
          console.error('Error en la creacion:', error);
          this.loadingServices.hide();
        }
      );
    } else {
      console.error('Hubo un error con los datos.');
    }
  }

  handleData(formValues: any) {
    const user = JSON.parse(localStorage.getItem('user') || '');
    const taskData = {
      title: formValues.title,
      user_email: user.email,
      description: formValues.description,
      status: formValues.status
    };
    return taskData;
  }

  async deleteTask(id?: number) {
    if (id) {
      this.loadingServices.show();
      const response = await this.taskServices.deleteTask(id).subscribe(
        (response) => {
          this.loadingServices.hide();
          this.getAll();
        },
        (error) => { 
          console.error('Error en la eliminacion:', error);
          this.loadingServices.hide();
        }
      );
    } else {
      console.error('Hubo un error con los datos.');
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  getStatusKey(status: string): keyof typeof this.icons {
    switch (status) {
      case 'pending': return 'pending';
      case 'progress': return 'progress';
      case 'completed': return 'completed';
      default: return 'plus';
    }
  }

}
