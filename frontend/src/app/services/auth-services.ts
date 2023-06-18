import { Injectable, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = false;
  Cookies: any 

  constructor(private cookieService: CookieService) { }

  login() {
    this.Cookies = this.cookieService.get('sessionId');
    if (this.Cookies != null) {
      this.loggedIn = true;
    }
    else {
      console.log('nottttt founddddddddddddddddddddN')
      this.loggedIn = false;
    }
  }

  logout() {
    console.log(this.Cookies);
    this.Cookies = null;
    console.log(this.Cookies);
    this.loggedIn = false;
    console.log("logout")
  }


  isAutheticated() {
    this.login()
    console.log("value" + this.loggedIn)
    return this.loggedIn;
  }

}
