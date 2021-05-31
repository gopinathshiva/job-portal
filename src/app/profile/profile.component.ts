import { Component, OnInit } from '@angular/core';
import {RecruiterService} from '../recruiter.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private recruiterService: RecruiterService, private route: ActivatedRoute, private httpClient: HttpClient) { }
  userInfo = {
    email: '',
    skills: '',
    githubUsername: ''
  };

  repos = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recruiterService.getEmployeeProfile(params.mailId).subscribe(data => {
        this.userInfo = data.employee;
      }, e => {
        console.log(e);
      });
    });
  }

  async loadGithub(): Promise<void> {
    const response = await this.httpClient.get(`https://api.github.com/users/${this.userInfo.githubUsername}/repos`)
      .toPromise().catch(e => {
      console.log(e);
    });

    if (response) {
      this.repos = response as [];
    } else {
      this.repos = [];
    }
  }

}
