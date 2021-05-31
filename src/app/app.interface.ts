import {HttpErrorResponse} from '@angular/common/http';

export interface Message {
  message: string;
}

export interface ErrorApiResponse extends Message {
  error: HttpErrorResponse;
}

export interface UserInfo {
  email: string;
  password: string;
}

export interface EmployeeLoginApiResponse extends UserInfo {
  skills: string;
}

export interface RecruiterLoginApiResponse extends Message {
  user: UserInfo;
}

export interface EmployeeLoginApiResponse extends RecruiterLoginApiResponse, Message {
  skills: string;
}

export interface Job {
  appliedBy: string[];
  companyName: string;
  contactInfo: string;
  id: string;
  minSalaryPerHr: number;
  postedBy: string;
  requirements: string;
  skills: string;
}

export interface PostedJobsApiResponse extends Message {
  count: number;
  jobs: Job[];
}

export interface JobsApiResponse extends Message {
  count: number;
  jobs: Job[];
}
