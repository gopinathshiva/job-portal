import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {EmployeeDashboardComponent} from './employee-dashboard/employee-dashboard.component';
import {RecruiterDashboardComponent} from './recruiter-dashboard/recruiter-dashboard.component';
import {ProfileComponent} from './profile/profile.component';

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
    path: 'employee-dashboard', component: EmployeeDashboardComponent,
  },
  {
    path: 'recruiter-dashboard', component: RecruiterDashboardComponent,
  },
  {
    path: 'profile/:mailId', component: ProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
