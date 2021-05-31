import { Component, OnInit } from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  selectedTabIndex = 0;

  ngOnInit(): void {
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTabIndex = tabChangeEvent.index;
  }

}
