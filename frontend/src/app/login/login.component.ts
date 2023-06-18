import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-services';
import { AuthService } from '../services/auth-services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public showPassword: boolean = false;
  cookie!: string;
  loggedin = false;
  email!: string;
  password!: string;
  loginForm: FormGroup | any;
  error : string = ''

  constructor(private fb: FormBuilder,
    private api: ApiService,
    private router: Router, private cookieService: CookieService, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
    })
  }

  onLogin() {
    this.error = ''
    // console.log(this.loginForm)
    if (this.loginForm.valid) {
      this.email = this.loginForm.value.email;
      this.password = this.loginForm.value.password;
      this.api.login(this.email, this.password).subscribe(res => {
        if (res.message){
          this.error = res.message
        }

        if (res) {
          this.cookieService.set('sessionId', res.data.session);
          this.authService.login();
          this.router.navigate(['/dashboard']);
          // alert("logged in successfully")
        }
        else { console.log("error") }

      })
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
