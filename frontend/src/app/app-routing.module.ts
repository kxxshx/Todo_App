import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { CompletedTaskComponent } from './completed-task/completed-task.component';
import { AuthGuard } from './auth-guard';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'viewTask', canActivate: [AuthGuard], component: ViewTaskComponent },
  { path: 'createTask', canActivate: [AuthGuard], component: CreateTaskComponent },
  { path: 'editTask', canActivate: [AuthGuard], component: EditTaskComponent },
  { path: 'editTask/:id', canActivate: [AuthGuard], component: EditTaskComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'showCompleted', canActivate: [AuthGuard], component: CompletedTaskComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
