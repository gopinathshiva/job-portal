import { Component } from '@angular/core';
import {LoaderService} from '../loader.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecruiterService} from '../recruiter.service';

@Component({
  selector: 'app-recruiter-login',
  templateUrl: './recruiter-login.component.html',
  styleUrls: ['./recruiter-login.component.scss']
})
export class RecruiterLoginComponent {

  constructor(private recruiterService: RecruiterService, private loaderService: LoaderService) {}

  get email(): AbstractControl | null { return this.loginForm.get('email'); }
  get password(): AbstractControl | null { return this.loginForm.get('password'); }

  submitted = false;
  message = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(3)]),
  });

  async onSubmit(): Promise<void> {
    this.submitted = true;
    this.loaderService.setLoading(true);
    const response = await this.recruiterService.login(JSON.stringify(this.loginForm.value)).toPromise().catch(e => {
      this.message = 'Login failed';
    });
    this.loaderService.setLoading(false);
    if (response) {
      localStorage.setItem('user', JSON.stringify(response.user));
      // TODO: navigate
    }
  }

}
