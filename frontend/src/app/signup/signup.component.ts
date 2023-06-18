import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-services';
import { CookieService } from 'ngx-cookie-service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public showPassword: boolean = false;
  name !: string;
  email!: string;
  password!: string;
  signupForm: FormGroup | any;
  error: string = ''

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private cookieService: CookieService, private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
    })
  }

  onSignup() {
    this.error = ''
    console.log(this.signupForm)
    this.name = this.signupForm.value.name;
    this.email = this.signupForm.value.email;
    this.password = this.signupForm.value.password;
    if (this.signupForm.valid) {
      // console.log("submitted");
      this.api.register(this.name, this.email, this.password).subscribe((res) => {
        if(res.errors){
          this.error = res.errors
          return
        }
        
        this.cookieService.set('sessionId', res.data.session);
        this.snackbar.open("You are registered!!", 'Close',{duration:3000});
        this.router.navigate(['/dashboard']);
      })
    }
    else {
      console.log("invalid")
      this.signupForm.reset();
      this.snackbar.open("your form is invalid",'Close',{duration:3000})
    }

  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}


