import { Component, OnInit } from '@angular/core';

import { slideInAnimation } from '../shared';

@Component({
  selector: 'app-user-docs',
  templateUrl: './user-docs.component.html',
  animations: [
    slideInAnimation
  ]
})
export class UserDocsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
