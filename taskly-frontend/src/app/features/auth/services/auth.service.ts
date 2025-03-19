import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login, ResponseLogin } from '../utils/models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlBase: string = environment.BASE_URL_USER || 'http://localhost:3000/api/v1/auth'

  constructor(private http: HttpClient) { }

  postLogin(user: Login): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(`${this.urlBase}/login`, user);
  }
}
