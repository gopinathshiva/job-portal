import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecruiterService} from '../recruiter.service';
import {errorHandler} from '../app.utils';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['../form.scss']
})
export class NewJobComponent implements OnInit {

  jobForm: FormGroup;
  submitted = false;

  get requirements(): AbstractControl | null { return this.jobForm.get('requirements'); }
  get skills(): AbstractControl | null { return this.jobForm.get('skills'); }
  get companyName(): AbstractControl | null { return this.jobForm.get('companyName'); }
  get contactInfo(): AbstractControl | null { return this.jobForm.get('contactInfo'); }
  get minSalaryPerHr(): AbstractControl | null { return this.jobForm.get('minSalaryPerHr'); }

  constructor(private fb: FormBuilder, private recruiterService: RecruiterService) { }

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      requirements: ['', Validators.required],
      skills: ['', Validators.required],
      companyName: ['', Validators.required],
      contactInfo: ['', Validators.required],
      minSalaryPerHr: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      postedBy: [this.recruiterService.recruiterInfo(), Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (!this.jobForm.valid) { return; }
    this.recruiterService.postJob(JSON.stringify(this.jobForm.value)).toPromise().catch(errorHandler);
  }

}
