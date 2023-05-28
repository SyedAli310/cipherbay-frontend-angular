import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConvertPageComponent } from './convert-page';
import { HomePageComponent } from './home-page';
import { NotFoundPageComponent } from './not-found-page';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'convert', component: ConvertPageComponent },
  {
    path: 'admin',
    loadChildren: () =>
      new Promise(() => {
        if (window.location.href.match(/admin/))
          window.location.href = 'https://cipherbay-api.vercel.app/panel/dash';
      }),
  },
  {
    path: 'legacy',
    loadChildren: () =>
      new Promise(() => {
        if (window.location.href.match(/legacy/))
          window.location.href = 'https://legacy-cipherbay.vercel.app';
      }),
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
