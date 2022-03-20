import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { IonicModule } from '@ionic/angular';
import { HeaderMainComponent } from './components/header-main/header-main.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ConvertPageComponent } from './components/convert-page/convert-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavbarComponent,
    HeaderMainComponent,
    HomePageComponent,
    ConvertPageComponent,
    NotFoundPageComponent,
    PreLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
