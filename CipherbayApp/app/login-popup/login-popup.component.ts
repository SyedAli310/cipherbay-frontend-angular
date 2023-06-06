import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UiService } from '../services/ui.service';
import { AuthService } from '../services';
import { LoginRegisterView } from './models';
import { slideInXAnimation, slideOutXAnimation } from '../shared';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  animations: [
    slideInXAnimation,
    slideOutXAnimation
  ]
})
export class LoginPopupComponent implements OnInit {
  loginRegisterView = LoginRegisterView;
  currentViewedTab = LoginRegisterView.Login;
  logoId: string = '1';

  // @Input() isOpen!: boolean;
  isOpen: boolean = false;
  isLoginLoading: boolean = false;
 
  errorText = ''
  @Output() closeLoginPopup = new EventEmitter();
  constructor(private uiService: UiService,
    private authService: AuthService) {
    this.uiService.isLoginPopupOpen.subscribe(
      (isLoginPopupOpen) => (this.isOpen = isLoginPopupOpen)
    );
  }

  ngOnInit(): void {}

  activateTab(tabView) {
    this.currentViewedTab = tabView;
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
