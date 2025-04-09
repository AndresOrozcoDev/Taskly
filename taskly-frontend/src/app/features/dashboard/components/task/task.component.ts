import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../utils/models';
import { LoadingService } from '../../../../utils/services/loading.service';
import { LucideAngularModule, Plus, Clock, Loader, CircleCheck, Trash } from 'lucide-angular';
import { ModalComponent } from '../../../../utils/components/modal/modal.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { User } from '../../../auth/utils/models/auth.models';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task',
  imports: [CommonModule, LucideAngularModule, ModalComponent, TaskFormComponent, DragDropModule],
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
  user: User | null = null;
  userSubscription: Subscription | null = null;

  constructor(private taskServices: TaskService, private loadingServices: LoadingService, private authService: AuthService) { }

  ngOnInit() {
    this.getAll();
    this.subscribeToUser();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  getAll() {
    this.loadingServices.show();
    this.taskServices.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Error al obtener las tareas', err);
      },
      complete: () => {
        this.loadingServices.hide();
      }
    });
  }

  onCreate(task: Task): void {
    if (task) {
      const dataTask = this.handleData(task);
      this.loadingServices.show();
      this.taskServices.postTask(dataTask).subscribe({
        next: (response) => {
          this.loadingServices.hide();
          this.closeModal();
          this.getAll();
        },
        error: (error) => {
          console.error('Error en la creación:', error);
          this.loadingServices.hide();
        }
      });
    } else {
      console.error('Hubo un error con los datos.');
    }
  }

  handleData(formValues: any){
    if (!this.user) {
      console.error('Usuario no encontrado.');
      return {
        title: '',
        user_email: '',
        description: '',
        status: ''
      };
    }
    const taskData = {
      title: formValues.title,
      user_email: this.user.email ?? '',
      description: formValues.description,
      status: formValues.status
    };
    return taskData;
  }

  deleteTask(id?: number): void {
    if (id) {
      this.loadingServices.show();
      this.taskServices.deleteTask(id).subscribe({
        next: (response) => {
          this.loadingServices.hide();
          this.getAll();
        },
        error: (error) => {
          console.error('Error en la eliminación:', error);
          this.loadingServices.hide();
        }
      });
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

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  private subscribeToUser(): void {
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        console.error('No se encontró un usuario autenticado');
      }
    });
  }

}
