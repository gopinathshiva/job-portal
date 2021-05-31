import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  private isDarkTheme = false;

  get isCurrentThemeDark(): boolean {
    return this.isDarkTheme;
  }

  public toggleCurrentTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }
}
