import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { LoadingService } from '../../../../utils/services/loading.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../utils/models/auth.models';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RegisterFormComponent, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private loadingService: LoadingService, private router: Router, private authServices: AuthService) {}

  async onRegister(data: User) {
    if (data) {
      console.log('Datos de registro:', data);
      this.loadingService.show();
      const response = await this.authServices.postRegister(data).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/']);
          this.loadingService.hide();
        },
        (error) => { console.error('Error en la autenticacion:', error); }
      );
    } else {
      console.error('Hubo un error con los datos.');
    }
  }
}
