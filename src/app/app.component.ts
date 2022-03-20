import { Component } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showLoader: boolean = false;

  constructor(private loaderService: LoaderService, private router: Router) {}

  ngOnInit() {
    this.loaderService.isLoaderShown.subscribe(
      (isLoaderShown) => (this.showLoader = isLoaderShown)
    );
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationStart) {
        this.loaderService.showLoader();
      } else if (routerEvent instanceof NavigationEnd) {
        this.loaderService.hideLoader();
      } else if (routerEvent instanceof NavigationCancel) {
        this.loaderService.hideLoader();
        // Handle cancel
      } else if (routerEvent instanceof NavigationError) {
        this.loaderService.hideLoader();
        // Handle error
      }
      console.log(this.showLoader);
    });
  }
}
