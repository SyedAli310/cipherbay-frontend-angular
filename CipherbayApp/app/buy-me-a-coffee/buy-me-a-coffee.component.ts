import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { slideInAnimation } from '../shared';

@Component({
  selector: 'app-buy-me-a-coffee',
  templateUrl: './buy-me-a-coffee.component.html',
  animations: [
    slideInAnimation
  ]
})
export class BuyMeACoffeeComponent implements OnInit {
  @ViewChild("buyMeACoffeModalTemplate") buyMeACoffeModalTemplate: TemplateRef<any>;
  buyMeACoffeModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openBuyMeACoffeeModal() {
    this.buyMeACoffeModalRef = this.modalService.show(this.buyMeACoffeModalTemplate, {class: 'modal-lg vertical-center', ignoreBackdropClick: true})
  }

  close() {
    this.buyMeACoffeModalRef.hide();
  }

}
