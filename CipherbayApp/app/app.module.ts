import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavbarComponent } from './side-navbar';
import { HeaderMainComponent } from './header-main';
import { HomePageComponent } from './home-page';
import { ConvertPageComponent } from './convert-page';
import { PreLoaderComponent } from './pre-loader';
import { NotFoundPageComponent } from './not-found-page';
import { SchemeModalComponent } from './scheme-modal';
import { LoginPopupComponent } from './login-popup';
import { SpinnerComponent } from './spinner';
import { SharedModule } from './shared/modules/shared.module';
import { UserFeedbackComponent } from './user-feedback/user-feedback.component';
import { UserDocsComponent } from './user-docs/user-docs.component';
import { BuyMeACoffeeComponent } from './buy-me-a-coffee/buy-me-a-coffee.component';
import { AllSchemesComponent } from './all-schemes/all-schemes.component';
import { AuthInterceptor, AuthService } from './auth';
import { UserLoginComponent } from './login-popup/user-login/user-login.component';
import { UserRegisterComponent } from './login-popup/user-register/user-register.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavbarComponent,
    HeaderMainComponent,
    HomePageComponent,
    ConvertPageComponent,
    NotFoundPageComponent,
    PreLoaderComponent,
    SchemeModalComponent,
    SpinnerComponent,
    LoginPopupComponent,
    UserFeedbackComponent,
    UserDocsComponent,
    BuyMeACoffeeComponent,
    AllSchemesComponent,
    UserLoginComponent,
    UserRegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgxSkeletonLoaderModule,
    SharedModule
  ],
  providers: [
    AuthService, 
    { provide: LOCALE_ID, useValue: 'en-IN'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
