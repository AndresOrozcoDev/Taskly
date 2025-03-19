import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { LoadingService } from '../../../../utils/services/loading.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private loadingService: LoadingService, private router: Router) {
  }
  
  onLogin(data: any) {
    if(data) {
      this.loadingService.show();
      console.log('Datos:', data);
      this.router.navigate(['/home']);
    } else {
      console.error('Hubo un error con los datos.');
    }
  }

}
