import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { LoadingService } from '../../../../utils/services/loading.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../utils/models/auth.models';

@Component({
  selector: 'app-login',
  imports: [CommonModule, LoginFormComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private loadingService: LoadingService, private router: Router, private authServices: AuthService) {
  }

  async onLogin(data: User) {
    if (data) {
      this.loadingService.show();
      const response = await this.authServices.postLogin(data).subscribe(
        (response) => {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/home']);
          this.loadingService.hide();
        },
        (error) => { console.error('Error en la autenticacion:', error); }
      );
    } else {
      console.error('Hubo un error con los datos.');
    }
  }

}
