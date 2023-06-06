import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html'
})
export class UserLoginComponent implements OnInit {
  logoCrawl: any;
  logoId: string = '1';
  isLoginLoading: boolean = false;
  errorText = ''

  constructor() { }

  ngOnInit(): void {
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

}
