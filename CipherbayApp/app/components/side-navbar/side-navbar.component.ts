import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import {
  faTimes,
  faHome,
  faCode,
  faCompass,
  faFileAlt,
  faInfoCircle,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html'
})
export class SideNavbarComponent implements OnInit {
  // Icons
  faTimes = faTimes;
  faHome = faHome;
  faCode = faCode;
  faCompass = faCompass;
  faFileAlt = faFileAlt;
  faInfoCircle = faInfoCircle;
  faCommentDots = faCommentDots;
  // Icons end
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
