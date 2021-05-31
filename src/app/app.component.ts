import {Component, OnInit} from '@angular/core';
import {ThemeService} from './theme.service';
import {LoaderService} from './loader.service';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'job-portal';

  get hasDarkTheme(): boolean {
    return this.themeService.isCurrentThemeDark;
  }

  get isLoading(): boolean {
    return this.loaderService.isLoading;
  }

  constructor(private themeService: ThemeService, private loaderService: LoaderService, private overlayContainer: OverlayContainer) {
  }

  ngOnInit(): void {
    this.overlayContainer.getContainerElement().classList.add('app-light-theme');
  }

  onThemeChange(): void {
    this.themeService.toggleCurrentTheme();
  }
}
