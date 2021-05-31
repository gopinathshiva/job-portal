import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecruiterService} from '../recruiter.service';
import {LoaderService} from '../loader.service';

@Component({
  selector: 'app-recruiter-register',
  templateUrl: './recruiter-register.component.html',
  styleUrls: ['./recruiter-register.component.scss']
})
export class RecruiterRegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private recruiterService: RecruiterService, private loaderService: LoaderService) { }

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
    this.loaderService.setLoading(true);
    const response = this.recruiterService.register(this.recruiterRegisterForm.value).toPromise().catch(e => {
      console.log(e);
    });
    this.loaderService.setLoading(false);
    if (response) {
      // TodO navigate
    }
  }

}
