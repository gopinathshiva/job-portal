import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from './app.constants';
import {Observable} from 'rxjs';
import {EmployeeLoginApiResponse, JobsApiResponse, UserInfo} from './app.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  login(body: string): Observable<EmployeeLoginApiResponse> {
    return this.httpClient.post<EmployeeLoginApiResponse>(`${AppConstants.BASE_URL}${AppConstants.EMPLOYEE_URL}${AppConstants.LOGIN_URL}`,
      body, {
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      }
    );
  }

  register(body: string): Observable<any> {
    return this.httpClient.post(`${AppConstants.BASE_URL}${AppConstants.EMPLOYEE_URL}${AppConstants.LOGIN_URL}`, body, {
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      }
    );
  }

  jobs(): Observable<JobsApiResponse> {
    return this.httpClient.get<JobsApiResponse>(`${AppConstants.BASE_URL}${AppConstants.JOBS_URL}`, {
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      }
    );
  }

  appliedJobs(): Observable<JobsApiResponse> {
    const mailId = this.employeeInfo();
    return this.httpClient.get<JobsApiResponse>(`${AppConstants.BASE_URL}${AppConstants.JOBS_URL}${AppConstants.APPLIED_BY_URL}${mailId}`, {
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      }
    );
  }

  applyJob(jobId: string): Observable<any> {
    const mailId = this.employeeInfo();
    return this.httpClient.get<any>(`${AppConstants.BASE_URL}${AppConstants.JOBS_URL}${AppConstants.APPLY_URL}${jobId}/${mailId}`, {
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      }
    );
  }

  employeeInfo(): UserInfo | undefined {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      return JSON.parse(userInfo).email;
    }
  }
}
