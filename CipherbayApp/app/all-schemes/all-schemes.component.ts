import { Component, OnInit } from '@angular/core';

import { SchemeView } from '../SchemeView';
import { CipherbayService } from '../services/cipherbay.service';
import { PromptService, slideInAnimation } from '../shared';

@Component({
  selector: 'app-all-schemes',
  templateUrl: './all-schemes.component.html',
  animations: [
    slideInAnimation
  ]
})
export class AllSchemesComponent implements OnInit {
  schemeData: any;
  allSchemes: SchemeView[];
  schemeInfo = 'Schemes are used to (encode <-> decode) (text <-> ciphers)'

  constructor(private cipherbayService: CipherbayService,
    private prompt: PromptService) { }

  ngOnInit(): void {
    this.cipherbayService.getSchemes().subscribe(data => {
      this.schemeData = data;
      this.allSchemes = this.schemeData.schemes;
    }, error => {
      this.prompt.error('Oops! Something went wrong while fetching schemes');
    })
  }

}
