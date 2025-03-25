import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Taks } from '../../utils/models';
import { LoadingService } from '../../../../utils/services/loading.service';
import { lastValueFrom } from 'rxjs';
import { LucideAngularModule, Plus, Clock, Loader, CircleCheck } from 'lucide-angular';
import { ModalComponent } from '../../../../utils/components/modal/modal.component';

@Component({
  selector: 'app-task',
  imports: [CommonModule, LucideAngularModule, ModalComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  tasks: Taks[] = [];
  readonly icons = {
    plus: Plus,
    pending: Clock,
    progress: Loader,
    completed: CircleCheck
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
      console.log('Tareas:', this.tasks);
    } catch (error) {
      console.error('Error al obtener las tareas', error);
    } finally {
      this.loadingServices.hide();
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
