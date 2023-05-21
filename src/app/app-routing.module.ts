import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ConvertPageComponent } from './components/convert-page/convert-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'convert', component: ConvertPageComponent },
  {
    path: 'admin',
    loadChildren: () =>
      new Promise(() => {
        if (window.location.href.match(/admin/))
          window.location.href = 'https://cipherbay-api.vercel.app/panel';
      }),
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
