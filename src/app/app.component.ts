import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ThemeService} from './theme.service';
import {LoaderService} from './loader.service';
import {OverlayContainer} from '@angular/cdk/overlay';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'job-portal';
  isLoading = false;

  get hasDarkTheme(): boolean {
    return this.themeService.isCurrentThemeDark;
  }

  constructor(private themeService: ThemeService, private loaderService: LoaderService, private overlayContainer: OverlayContainer) {
  }

  ngOnInit(): void {
    this.overlayContainer.getContainerElement().classList.add('app-light-theme');
  }

  ngAfterViewInit(): void {
    this.loaderService.isLoading$.subscribe(isLoading => {
      setTimeout(() => {
        this.isLoading = isLoading;
      }, 0);
    });
  }

  onThemeChange(): void {
    this.themeService.toggleCurrentTheme();
  }
}
