import { Component } from '@angular/core';
import { AsideComponent } from '../../components/aside/aside.component';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  imports: [RouterModule, AsideComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  decodedToken: any;
  rol : string = 'user';
  isLogout : boolean = false;

  constructor(private router: Router) {}

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

  logout(isLogout: boolean) {
    if(isLogout) {
      this.router.navigate(['/']);
      localStorage.removeItem('authToken');
    } else {
      console.error('Error'); 
    }
  }

}
