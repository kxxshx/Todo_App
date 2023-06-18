import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api-services';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private api: ApiService, private router: Router, private authService: AuthService) { }

  onlogout() {
    this.api.logout().subscribe((res) => {
      console.log(res);
      if (res) {
        // this.authService.loggedIn=false;
        this.authService.logout();
        this.router.navigate(['/login']);

      }
    })
  }
}
