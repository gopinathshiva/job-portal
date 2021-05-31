import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoaderComponent} from './loader/loader.component';
import {AppHeaderComponent} from './app-header/app-header.component';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { RecruiterLoginComponent } from './recruiter-login/recruiter-login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { RecruiterDashboardComponent } from './recruiter-dashboard/recruiter-dashboard.component';
import { JobsComponent } from './jobs/jobs.component';
import { PostedJobsComponent } from './posted-jobs/posted-jobs.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { ProfileComponent } from './profile/profile.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { RecruiterRegisterComponent } from './recruiter-register/recruiter-register.component';
import {TableComponent} from './table/table.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    AppHeaderComponent,
    LoginComponent,
    RegisterComponent,
    EmployeeLoginComponent,
    RecruiterLoginComponent,
    EmployeeDashboardComponent,
    RecruiterDashboardComponent,
    JobsComponent,
    PostedJobsComponent,
    AppliedJobsComponent,
    ProfileComponent,
    EmployeeRegisterComponent,
    RecruiterRegisterComponent,
    TableComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
