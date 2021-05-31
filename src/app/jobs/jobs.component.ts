import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  jobs: any[] = [];

  async ngOnInit(): Promise<void> {
    const response = await this.employeeService.jobs().toPromise().catch(e => {
      console.log(e);
    });

    if (response) {
      this.jobs = response.jobs;
    } else {
      this.jobs = [];
    }
  }

  async onActionClick(jobId: string): Promise<void> {
    await this.employeeService.applyJob(jobId).toPromise().catch(e => {
      console.log(e);
    });
  }

}
