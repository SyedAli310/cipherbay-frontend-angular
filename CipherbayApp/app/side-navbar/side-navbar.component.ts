import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html'
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
  onOutClick(event: any) {
    const el = event.target;
    if (
      el.classList.contains('open') &&
      !el.classList.contains('side-navbar')
    ) {
      this.closeSidebar();
    }
  }

  routerChangeMethod(url: string) {
    console.log('route changed to: ' + url);
    this.closeSidebar();
  }
}
