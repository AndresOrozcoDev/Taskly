import { Component } from '@angular/core';
import { ForgetFormComponent } from '../../components/forget-form/forget-form.component';
import { Email } from '../../utils/models/auth.models';
import { LoadingService } from '../../../../utils/services/loading.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget',
  imports: [ForgetFormComponent],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent {

  newPassword: string = '';

  constructor(private loadingService: LoadingService, private authServices: AuthService) {}

  async onForgetPassword(email: Email): Promise<void> {
    if (email) {
      this.loadingService.show();
      try {
        const response = await this.authServices.postForgetPassword(email).toPromise();
        if (response) {
          this.newPassword = response.newPassword;
        } else {
          console.error('Error al obtener una nueva contrseña.');
        }
      } catch (error) {
        console.error('Error al esperar una respuesta:', error);
      } finally {
        this.loadingService.hide();
      }
    } else {
      console.error('Hubo un error con los datos.');
    }
  }

}
