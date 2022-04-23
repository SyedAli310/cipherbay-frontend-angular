import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { HeaderMainComponent } from './components/header-main/header-main.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ConvertPageComponent } from './components/convert-page/convert-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SchemeModalComponent } from './components/scheme-modal/scheme-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoginPopupComponent } from './components/login-popup/login-popup.component';
import { BodyMainComponent } from './components/body-main/body-main.component';

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
    BodyMainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
