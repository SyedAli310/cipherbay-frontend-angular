import { Component, OnInit } from '@angular/core';
import { appearAnimation } from '../shared';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  animations: [appearAnimation]
})
export class NotFoundPageComponent implements OnInit {
  constructor() { }

  randomPercentageValue: number = 0;

  randomPercentage() {
    this.randomPercentageValue = Math.floor(Math.random() * 100)
  }

  ngOnInit(): void {
    this.randomPercentage();
  }

}
