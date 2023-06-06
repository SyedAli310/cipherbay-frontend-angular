import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter,
} from '@angular/core';
import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'CipherbayApp/app/services/ui.service';
import { AuthService } from '../services';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html'
})
export class HeaderMainComponent implements OnInit {
  hamburger = faBars;
  caretDown = faCaretDown;

  isSidebarOpen: boolean = false;
  isDropdownOpen: boolean = false;

  logoId: string = '1';
  logoCrawl: any;

  @ViewChild('dropdownToggle') dropdownToggle?: ElementRef;
  @ViewChild('dropdownWraper') dropdownWraper?: ElementRef;
  currentUser: any;
  constructor(private renderer: Renderer2, private uiService: UiService, private authService: AuthService) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.dropdownToggle?.nativeElement &&
        e.target !== this.dropdownWraper?.nativeElement &&
        !this.dropdownWraper?.nativeElement.contains(e.target)
      ) {
        this.isDropdownOpen = false;
      }
    });
  }

  ngOnInit(): void {
    this.authService.getUserStatus().subscribe(data => {
      if(data.auth) {
        this.currentUser = data.loggedInUser;
      } else {
        this.currentUser = null;
      }
    })
  }

  onLogout() {
    this.authService.userLogout();
    window.location.reload();
  }

  startCrawl() {
    if (this.logoCrawl) {
      this.stopCrawl();
    }
    this.logoCrawl = setInterval(() => {
      this.logoId = this.logoId === '1' ? '2' : '1';
    }, 250);
  }

  stopCrawl() {
    clearInterval(this.logoCrawl);
  }

  openSideNav() {
    this.isSidebarOpen = true;
  }
  closeSideNav() {
    this.isSidebarOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onLoginClick() {
    this.uiService.openLoginPopup();
    this.toggleDropdown();
  }
}
