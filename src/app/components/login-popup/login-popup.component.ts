import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent implements OnInit {
  currentViewedTab: string = 'login';

  @Input() isOpen!: boolean;
  @Output() closeLoginPopup = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  activateTab(tab: HTMLDivElement) {
    this.currentViewedTab = tab.dataset['tab'] as string;
  }

  close(event: any) {
    const el = event.target;
    if (
      el.classList.contains('open') &&
      !el.classList.contains('login-popup')
    ) {
   
      this.closeLoginPopup.emit();
    
    }
  }
}
