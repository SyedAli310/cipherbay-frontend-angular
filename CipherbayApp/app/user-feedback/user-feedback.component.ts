import { Component, OnInit } from '@angular/core';

import { slideInAnimation } from '../shared';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  animations: [
    slideInAnimation
  ]
})
export class UserFeedbackComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
