import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { UiService } from 'CipherbayApp/app/services/ui.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html'
})
export class LoginPopupComponent implements OnInit {
  currentViewedTab: string = 'login';
  logoId: string = '1';
  logoCrawl: any;

  // @Input() isOpen!: boolean;
  isOpen: boolean = false;
  isLoginLoading: boolean = false;
  errorText = ''
  @Output() closeLoginPopup = new EventEmitter();
  constructor(private uiService: UiService) {
    this.uiService.isLoginPopupOpen.subscribe(
      (isLoginPopupOpen) => (this.isOpen = isLoginPopupOpen)
    );
  }

  ngOnInit(): void {}

  activateTab(tab: HTMLDivElement) {
    this.currentViewedTab = tab.dataset['tab'] as string;
  }

  login() {
    this.isLoginLoading = true;
    this.errorText = '';
    this.sleep(2100).then(() => {
      this.errorText = 'Login attempt failed'
      this.isLoginLoading = false;
    })
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

  close(event: any) {
    const el = event.target;
    if (
      el.classList.contains('open') &&
      !el.classList.contains('login-popup')
    ) {
      this.uiService.closeLoginPopup();
    }
  }
}
