import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

  @Output() handleThemeChange = new EventEmitter();

  constructor(private router: Router) { }

  async gotoHome(): Promise<void> {
    await this.router.navigate(['/']);
  }

  async onRegister(): Promise<void> {
    await this.router.navigate(['/register']);
  }

  async onLogin(): Promise<void> {
    await this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  async onLogout(): Promise<void> {
    localStorage.removeItem('user');
    localStorage.removeItem('isRecruiter');
    localStorage.removeItem('isEmployee');
    await this.router.navigate(['/login']);
  }

  async onClickDashboard(): Promise<void> {
    if (localStorage.getItem('isRecruiter')) {
      await this.router.navigate(['/recruiter-dashboard']);
    } else {
      await this.router.navigate(['/employee-dashboard']);
    }
  }

  toggleTheme(): void {
    this.handleThemeChange.emit();
  }

}
