import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html'
})
export class NotFoundPageComponent implements OnInit {
  constructor() { }

  get randomPercentage() {
    return Math.floor(Math.random() * 100)
  }

  ngOnInit(): void {
  }

}
