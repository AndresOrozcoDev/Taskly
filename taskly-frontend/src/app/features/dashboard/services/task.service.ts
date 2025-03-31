import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseTask, Task } from '../utils/models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  urlBase: string = environment.BASE_URL_TASK || 'http://127.0.0.1:8000/api/v1/tasks'

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.urlBase}`)
  }

  postTask(task: Task): Observable<ResponseTask> {
    return this.http.post<ResponseTask>(`${this.urlBase}`, task);
  }

  deleteTask(id: number): Observable<ResponseTask> {
    return this.http.delete<ResponseTask>(`${this.urlBase}/${id}`)
  }
}
