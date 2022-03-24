import { Component, OnInit } from '@angular/core';

import { faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
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
  constructor() {}

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
}
