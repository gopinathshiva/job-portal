import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../employee.service';
import {delayExecution, errorHandler} from '../app.utils';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['../form.scss']
})
export class EmployeeRegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router) { }

  get email(): AbstractControl | null { return this.employeeRegisterForm.get('email'); }
  get password(): AbstractControl | null { return this.employeeRegisterForm.get('password'); }
  get githubUsername(): AbstractControl | null { return this.employeeRegisterForm.get('githubUsername'); }
  get skills(): AbstractControl | null { return this.employeeRegisterForm.get('skills'); }

  employeeRegisterForm: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.employeeRegisterForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      githubUsername: ['', Validators.required],
      skills: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (!this.employeeRegisterForm.valid) { return; }
    const response = await this.employeeService.register(JSON.stringify(this.employeeRegisterForm.value)).toPromise().catch(errorHandler);
    if (response) {
      this.employeeRegisterForm.reset();
      delayExecution(async () => {
        await this.router.navigate(['/login']);
      });
    }
  }

}
