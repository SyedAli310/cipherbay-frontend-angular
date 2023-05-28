import { Component } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  RouterLink,
} from '@angular/router';
import { LoaderService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // showLoader: boolean = false;
  title: string = 'cipherbay';

  constructor(private loaderService: LoaderService, private router: Router) {}

  ngOnInit() {
    // this.loaderService.isLoaderShown.subscribe(
    //   (isLoaderShown) => (this.showLoader = isLoaderShown)
    // );
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationStart) {
        this.routerChangeMethod(routerEvent.url);
        // this.loaderService.showLoader();
      } else if (routerEvent instanceof NavigationEnd) {
        // this.sleep(1000).then(() => this.loaderService.hideLoader());
      } else if (routerEvent instanceof NavigationCancel) {
        // this.sleep(1000).then(() => this.loaderService.hideLoader());
        // Handle cancel
      } else if (routerEvent instanceof NavigationError) {
        // this.sleep(1000).then(() => this.loaderService.hideLoader());
        // Handle error
      }
      // console.log(this.showLoader);
    });
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  routerChangeMethod(url: string) {
    this.title = 'cipherbay / ' + (url.split('/')[1] || 'home');
  }
}
