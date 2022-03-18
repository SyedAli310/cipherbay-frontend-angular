import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent implements OnInit {
  @Input() isSidebarOpen!: boolean;
  @Output() closeSidebarEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    // this.isSidebarOpen = true;
  }
  closeSidebar() {
    this.closeSidebarEvent.emit();
  }
}
