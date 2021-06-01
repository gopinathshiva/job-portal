import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.service';
import {errorHandler} from '../app.utils';
import {Job} from '../app.interface';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  jobs: any[] = [];

  async ngOnInit(): Promise<void> {
    const response = await this.employeeService.jobs().toPromise().catch(errorHandler);

    if (response) {
      this.jobs = response.jobs;
    } else {
      this.jobs = [];
    }
  }

  async onActionClick(job: Job): Promise<void> {
    await this.employeeService.applyJob(job.id).toPromise().catch(errorHandler);
  }

}
