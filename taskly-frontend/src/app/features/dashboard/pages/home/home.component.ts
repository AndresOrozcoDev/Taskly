import { Component } from '@angular/core';
import { AsideComponent } from '../../components/aside/aside.component';
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  imports: [RouterModule, AsideComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  decodedToken: any;
  rol : string = 'user'

  ngOnInit() {
    this.decodeToken();
  }

  private decodeToken(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        this.decodedToken = jwtDecode(token);
        this.rol = this.decodedToken?.rol || 'user';
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }

}
