import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { slideInAnimation } from '../shared';

@Component({
  selector: 'app-buy-me-a-coffee',
  templateUrl: './buy-me-a-coffee.component.html',
  animations: [
    slideInAnimation
  ]
})
export class BuyMeACoffeeComponent implements OnInit {

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  close() {
    this.modalRef.hide();
  }

}
