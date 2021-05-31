import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecruiterService} from '../recruiter.service';
import {delayExecution, errorHandler} from '../app.utils';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recruiter-register',
  templateUrl: './recruiter-register.component.html',
  styleUrls: ['./recruiter-register.component.scss']
})
export class RecruiterRegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private recruiterService: RecruiterService, private router: Router) { }

  get email(): AbstractControl | null { return this.recruiterRegisterForm.get('email'); }
  get password(): AbstractControl | null { return this.recruiterRegisterForm.get('password'); }

  recruiterRegisterForm: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.recruiterRegisterForm = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (!this.recruiterRegisterForm.valid) { return; }
    const response = this.recruiterService.register(this.recruiterRegisterForm.value).toPromise().catch(errorHandler);
    if (response) {
      delayExecution(async () => {
        await this.router.navigate(['/login']);
      });
    }
  }

}
