import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services';
import { IS_REGISTERATION_ENABLED, PromptService } from '../../shared';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html'
})
export class UserRegisterComponent implements OnInit {
  logoCrawl: any;
  logoId: string = '1';
  isInviteOnly: boolean = !IS_REGISTERATION_ENABLED;
  isRegisterLoading: boolean = false;
  errorText = ''

  registerForm: FormGroup;


  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService,
    private promptService: PromptService) { }

  validationMessages = {
    'firstName': [
      { type: 'required', message: 'first name is required' },
      { type: 'min', message: 'first name should be atleast 3 characters' },
      { type: 'max', message: 'first name cannot be more than 30 characters' },

    ],
    'lastName': [
      { type: 'required', message: 'last name is required' },
      { type: 'min', message: 'last name should be atleast 3 characters' },
      { type: 'max', message: 'last name cannot be more than 30 characters' },
    ],
    'email': [
        { type: 'required', message: 'email is required' },
        { type: 'email', message: 'email is invalid' },
    ],
    'password': [
        { type: 'required', message: 'password is required' },
        { type: 'passwordMismatch', message: 'passwords do not match' },
    ],
    'confirmPassword': [
        { type: 'required', message: 'confirm password is required' },
        { type: 'passwordMismatch', message: 'passwords do not match' },
    ],
  };

  ngOnInit(): void {
    this.initializeRegisterForm()
  }

  initializeRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.min(3), Validators.max(30)]],
      lastName: ['', [Validators.required,  Validators.min(3), Validators.max(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordMatcher.bind(this)]],
      confirmPassword: ['', [Validators.required, this.passwordMatcher.bind(this)]],
    })
  }

  passwordMatcher(control: FormControl): { [key: string]: any } | null {
    if (this.registerForm) {
        const password = this.registerForm.get('password');
        const confirmPassword = this.registerForm.get('confirmPassword');
        return (password.value.trim() !== confirmPassword.value.trim()) ? { 'passwordMismatch': true } : null;
    }
    return null;
  }

  register() {
    if(this.registerForm.valid) {
      this.isRegisterLoading = true;
      this.authService.userRegister(this.registerForm.getRawValue()).subscribe(data => {
        this.isRegisterLoading = false;
        if(!data.error) {
          this.promptService.success('Registered successfully, Loggin in now...')
          this.sleep(1500).then(() => {
            this.authService.userLogin({ email: this.registerForm.get('email').value, password: this.registerForm.get('password').value}).subscribe(data => {
              if(!data.error) {
                this.authService.setToken(data.token);
                window.location.reload();
              } else {
                this.promptService.error(data.msg);
              }
            })
          })
        } else {
          this.promptService.error(data.msg);
        }
      }, (error) => {
        this.isRegisterLoading = false;
        this.promptService.error('Something went wrong, please try again');
      })
    } else {
      this.registerForm.markAllAsTouched();
    }
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
    this.isRegisterLoading = true;
    this.sleep(2100).then(() => {
      this.errorText = 'Login attempt failed'
      this.isRegisterLoading = false;
    })
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

}
