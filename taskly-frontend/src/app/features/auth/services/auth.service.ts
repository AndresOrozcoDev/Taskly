import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlBase: string = environment.BASE_URL_USER || 'http://127.0.0.1:3000/api/v1'

  constructor() { }
}
