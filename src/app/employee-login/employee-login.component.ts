import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../employee.service';
import {LoaderService} from '../loader.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss']
})
export class EmployeeLoginComponent {

  constructor(private employeeService: EmployeeService, private loaderService: LoaderService) {}

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
    const response = await this.employeeService.login(JSON.stringify(this.loginForm.value)).toPromise().catch(e => {
      this.message = 'Login failed';
    });
    this.loaderService.setLoading(false);
    if (response) {
      localStorage.setItem('user', JSON.stringify(response.user));
      // TODO: navigate
    }
  }

}
