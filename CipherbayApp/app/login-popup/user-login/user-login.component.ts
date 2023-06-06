import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PromptService } from '../../shared';
import { AuthService } from '../../services';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html'
})
export class UserLoginComponent implements OnInit {
  logoCrawl: any;
  logoId: string = '1';
  isLoginLoading: boolean = false;
  errorText = ''

  loginForm: FormGroup;

  constructor(  private authService: AuthService,
    private formBuilder: FormBuilder,
    private promptService: PromptService) { }

    validationMessages = {
      'email': [
          { type: 'required', message: 'email is required' },
          { type: 'email', message: 'email is invalid' },
      ],
      'password': [
          { type: 'required', message: 'password is required' },
      ],
    };

  ngOnInit(): void {
    this.initializeLoginForm()
  }

  initializeLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
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
    if(this.loginForm.valid) {
      this.isLoginLoading = true;
      this.authService.userLogin(this.loginForm.getRawValue()).subscribe(data => {
        this.isLoginLoading = false;
        if(!data.error) {
          this.authService.setToken(data.token);
          window.location.reload();
        } else {
          this.promptService.error(data.msg);
        }
      }, (error) => {
        this.isLoginLoading = false;
        this.promptService.error('Something went wrong, please try again');
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

}
