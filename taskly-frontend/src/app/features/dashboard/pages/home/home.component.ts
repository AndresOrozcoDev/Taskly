import { Component } from '@angular/core';
import { AsideComponent } from '../../components/aside/aside.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/utils/models/auth.models';
import { tap } from 'rxjs/operators';;

@Component({
  selector: 'app-home',
  imports: [RouterModule, AsideComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  user: User | null = null;
  decodedToken: any;
  rol : string = 'user';
  isLogout : boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.pipe(
      tap((user: User | null) => {
        if (user) {
          this.user = user;
          this.rol = user.rol || 'user';
        } else {
          console.error('No se encontró un usuario autenticado.');
          throw new Error('No se encontró un usuario autenticado');
        }
      })
    ).subscribe();
  }

  logout(isLogout: boolean) {
    if (isLogout) {
      this.authService.logout();
      this.router.navigate(['/']);
    } else {
      console.error('Error');
    }
  }

}
