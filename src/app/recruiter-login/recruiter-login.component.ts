import { Component } from '@angular/core';
import {LoaderService} from '../loader.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecruiterService} from '../recruiter.service';
import {Router} from '@angular/router';
import {delayExecution, errorHandler} from '../app.utils';

@Component({
  selector: 'app-recruiter-login',
  templateUrl: './recruiter-login.component.html',
  styleUrls: ['./recruiter-login.component.scss']
})
export class RecruiterLoginComponent {

  constructor(private recruiterService: RecruiterService, private loaderService: LoaderService, private router: Router) {}

  get email(): AbstractControl | null { return this.loginForm.get('email'); }
  get password(): AbstractControl | null { return this.loginForm.get('password'); }

  submitted = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(3)]),
  });

  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (!this.loginForm.valid) { return; }
    const response = await this.recruiterService.login(JSON.stringify(this.loginForm.value)).toPromise().catch(errorHandler);
    if (response) {
      this.loginForm.reset();
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('isRecruiter', 'true');
      delayExecution(async () => {
        await this.router.navigate(['/recruiter-dashboard']);
      });
    }
  }

}
