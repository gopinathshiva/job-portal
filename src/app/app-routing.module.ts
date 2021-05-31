import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {EmployeeDashboardComponent} from './employee-dashboard/employee-dashboard.component';
import {RecruiterDashboardComponent} from './recruiter-dashboard/recruiter-dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {NewJobComponent} from './new-job/new-job.component';
import {EmployeeAuthGuardService} from './employee-auth-guard.service';
import {RecruiterAuthGuardService} from './recruiter-auth-guard.service';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'register', component: RegisterComponent,
  },
  {
    path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [EmployeeAuthGuardService]
  },
  {
    path: 'recruiter-dashboard', component: RecruiterDashboardComponent, canActivate: [RecruiterAuthGuardService]
  },
  {
    path: 'profile/:mailId', component: ProfileComponent, canActivate: [RecruiterAuthGuardService]
  },
  {
    path: 'new-job', component: NewJobComponent, canActivate: [RecruiterAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
