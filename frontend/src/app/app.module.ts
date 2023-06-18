import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyMaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api-services';
import { AuthService } from './services/auth-services';
import { AuthComponent } from './header/auth/auth.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { CompletedTaskComponent } from './completed-task/completed-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    CreateTaskComponent,
    ViewTaskComponent,
    AuthComponent,
    EditTaskComponent,
    CompletedTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
