import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
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
  isDropdownOpen: boolean = false;

  @ViewChild('dropdownToggle') dropdownToggle?: ElementRef;
  @ViewChild('dropdownWraper') dropdownWraper?: ElementRef;
  constructor(private renderer: Renderer2) {
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

  ngOnInit(): void {}

  openSideNav() {
    this.isSidebarOpen = true;
  }
  closeSideNav() {
    this.isSidebarOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
