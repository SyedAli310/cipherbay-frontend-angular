import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/modules/shared.module';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
