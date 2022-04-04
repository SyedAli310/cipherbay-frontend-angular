import { Component, OnInit } from '@angular/core';

import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-pre-loader',
  templateUrl: './pre-loader.component.html',
  styleUrls: ['./pre-loader.component.scss'],
})
export class PreLoaderComponent implements OnInit {
  isLoaderShown: boolean = false;
  constructor(private loaderService: LoaderService) {}
  ngOnInit(): void {
    this.loaderService.isLoaderShown.subscribe(
      (isLoaderShown) => (this.isLoaderShown = isLoaderShown)
    );
  }
}
