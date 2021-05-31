import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAuthGuardService implements CanActivate {
  constructor(public router: Router) {}
  async canActivate(): Promise<boolean> {
    if (!(localStorage.getItem('user') && localStorage.getItem('isEmployee'))) {
      await this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
