import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  jobs: any = [];

  async ngOnInit(): Promise<void> {
    console.log('init');
    const response = await this.employeeService.appliedJobs().toPromise().catch(e => {
      console.log(e);
    });

    if (response) {
      this.jobs = response.jobs;
    } else {
      this.jobs = [];
    }
  }

  onActionClick(data): void {

  }

}
