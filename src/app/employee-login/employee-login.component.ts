import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../employee.service';
import {LoaderService} from '../loader.service';
import {delayExecution, errorHandler} from '../app.utils';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss']
})
export class EmployeeLoginComponent {

  constructor(private employeeService: EmployeeService, private loaderService: LoaderService, private router: Router) {}

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
    const response = await this.employeeService.login(JSON.stringify(this.loginForm.value)).toPromise().catch(errorHandler);
    if (response) {
      this.loginForm.reset();
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('isEmployee', 'true');
      delayExecution(async () => {
        await this.router.navigate(['employee-dashboard']);
      });
    }
  }

}
