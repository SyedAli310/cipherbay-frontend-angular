import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent implements OnInit {
  @Input() isSidebarOpen!: boolean;
  @Output() closeSidebarEvent = new EventEmitter();
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.routerChangeMethod(event.url);
      }
    });
  }
  closeSidebar() {
    this.closeSidebarEvent.emit();
  }

  routerChangeMethod(url: any) {
    console.log('route changed to: ' + url);
    this.closeSidebar();
  }
}
