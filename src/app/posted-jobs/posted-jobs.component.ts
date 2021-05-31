import { Component, OnInit } from '@angular/core';
import {RecruiterService} from '../recruiter.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-posted-jobs',
  templateUrl: './posted-jobs.component.html',
  styleUrls: ['./posted-jobs.component.scss']
})
export class PostedJobsComponent implements OnInit {

  constructor(private recruiterService: RecruiterService, private router: Router,) { }

  jobs: any[] = [];

  async ngOnInit(): Promise<void> {
    const response = await this.recruiterService.postedJobs().toPromise().catch(e => {
      console.log(e);
    });
    if (response) {
      this.jobs = response.jobs;
    } else {
      this.jobs = [];
    }
  }

  async onActionClick(user): Promise<void> {
    await this.router.navigate([`/profile/${user}`]);
  }

  async addJob(): Promise<void> {
    await this.router.navigate(['/new-job']);
  }

}
