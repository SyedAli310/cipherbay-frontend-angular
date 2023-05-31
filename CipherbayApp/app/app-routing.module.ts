import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConvertPageComponent } from './convert-page';
import { HomePageComponent } from './home-page';
import { NotFoundPageComponent } from './not-found-page';
import { UserDocsComponent } from './user-docs';
import { UserFeedbackComponent } from './user-feedback';
import { AllSchemesComponent } from './all-schemes';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'convert', component: ConvertPageComponent, 
    children: [
      // { path: '', redirectTo: 'encode', pathMatch: 'full' },
      { path: 'encode', component: ConvertPageComponent, data: {mode: 'encode'} },
      { path: 'decode', component: ConvertPageComponent, data: {mode: 'decode'} }
    ]
  },
  { path: 'feedback', component: UserFeedbackComponent },
  { path: 'docs', component: UserDocsComponent },
  { path: 'schemes', component: AllSchemesComponent },
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
