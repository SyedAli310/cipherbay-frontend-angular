import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'CipherbayApp/app/services/ui.service';
import { CIPHER_TAGLINES, slideInAnimation, appearAnimation, slideOutAnimation } from '../shared';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  animations: [slideInAnimation, slideOutAnimation, appearAnimation]
})
export class HomePageComponent implements OnInit {
  animatedText: string = 'Hi Cipher Lords 👽';
  taglines = CIPHER_TAGLINES;

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.textLoop();
      this.animatedText = 'ciphers are cool'
    },2500)
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
    return this.taglines[Math.floor(Math.random() * this.taglines.length)];
  }

  onLoginClick() {
    this.uiService.openLoginPopup();
  }
}
