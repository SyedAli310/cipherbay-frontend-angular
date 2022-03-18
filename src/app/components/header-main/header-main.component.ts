import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss'],
})
export class HeaderMainComponent implements OnInit {
  isSidebarOpen: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  openSideNav() {
    this.isSidebarOpen = true;
  }
  closeSideNav() {
    this.isSidebarOpen = false;
  }
}
