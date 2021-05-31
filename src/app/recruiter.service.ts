import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RecruiterLoginApiResponse, UserInfo} from './app.interface';
import {AppConstants} from './app.constants';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {

  constructor(private httpClient: HttpClient) { }

  login(body: string): Observable<RecruiterLoginApiResponse> {
    return this.httpClient.post<RecruiterLoginApiResponse>(`${AppConstants.BASE_URL}${AppConstants.RECRUITER_URL}${AppConstants.LOGIN_URL}`,
      body, {
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      }
    );
  }

  register(body: string): Observable<any> {
    return this.httpClient.post(`${AppConstants.BASE_URL}${AppConstants.RECRUITER_URL}${AppConstants.REGISTER_URL}`, body, {
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      }
    );
  }

  postedJobs(): Observable<any> {
    const mailId = this.recruiterInfo();
    return this.httpClient.get(`${AppConstants.BASE_URL}${AppConstants.JOBS_URL}${AppConstants.POSTED_BY_URL}${mailId}`, {
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      }
    );
  }

  recruiterInfo(): UserInfo | undefined {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      return JSON.parse(userInfo).email;
    }
  }

  getEmployeeProfile(mailId: string): Observable<any> {
    return this.httpClient.get(`${AppConstants.BASE_URL}${AppConstants.EMPLOYEE_URL}${AppConstants.PROFILE_URL}${mailId}`, {
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      }
    );
  }
}
