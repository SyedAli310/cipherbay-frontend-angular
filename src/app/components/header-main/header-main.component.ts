import { Component, OnInit } from '@angular/core';
import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss'],
})
export class HeaderMainComponent implements OnInit {
  hamburger = faBars;
  caretDown = faCaretDown;

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
