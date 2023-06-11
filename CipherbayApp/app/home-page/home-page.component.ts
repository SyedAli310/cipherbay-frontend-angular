import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'CipherbayApp/app/services/ui.service';
import { slideInAnimation, slideInXAnimation, slideOutXAnimation } from '../shared';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
  // icons
  faArrowRight = faArrowRight;
  faUser = faUser;
  animatedText: string = 'ciphers are cool';
  textArray = [
    'ciphers are cool',
    'ciphers are hot',
    'ciphers are awesome',
    'ciphers are sexy',
    'ciphers are trendy',
  ];

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.textLoop();
  }

  textLoop() {
    this.animatedText =
      Math.random() > 0.5
        ? this.reverseText(this.animatedText)
        : this.changeText();

    setTimeout(() => {
      this.textLoop();
    }, 3000);
  }

  reverseText(text: string) {
    return text.split('').reverse().join('');
  }
  changeText(): string {
    return this.textArray[Math.floor(Math.random() * this.textArray.length)];
  }

  onLoginClick() {
    this.uiService.openLoginPopup();
  }
}
