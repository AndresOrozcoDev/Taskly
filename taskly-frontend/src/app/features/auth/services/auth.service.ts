import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, ResponseLogin, ResponseRegister } from '../utils/models/auth.models';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlBase: string = environment.BASE_URL_USER || 'http://localhost:3000/api/v1/auth'

  private userSubject: BehaviorSubject<User | null>;
  public user$: Observable<User | null>;

  constructor(private http: HttpClient) { 
    const token = localStorage.getItem('authToken');
    const user = token ? this.decodeToken(token) : null;
    this.userSubject = new BehaviorSubject<User | null>(user);
    this.user$ = this.userSubject.asObservable();
  }

  private decodeToken(token: string): User | null {
    try {
      const decoded: any = jwtDecode(token);
      return {
        id: decoded.id,
        email: decoded.email,
        rol: decoded.rol
      } as User;
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return null;
    }
  }

  postLogin(user: User): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(`${this.urlBase}/login`, user).pipe(
      tap((response: ResponseLogin) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          const user = this.decodeToken(response.token);
          this.userSubject.next(user);
        }
      })
    );
  }

  postRegister(user: User): Observable<ResponseRegister> {
    return this.http.post<ResponseRegister>(`${this.urlBase}/register`, user)
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('authToken');
  }
}
