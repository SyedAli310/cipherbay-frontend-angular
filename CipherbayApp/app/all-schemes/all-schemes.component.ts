import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { SchemeView } from '../SchemeView';
import { CipherbayService } from '../services/cipherbay.service';
import { appearAnimation, LayoutView, PromptService, slideInAnimation } from '../shared';

@Component({
  selector: 'app-all-schemes',
  templateUrl: './all-schemes.component.html',
  animations: [
    slideInAnimation,
    appearAnimation
  ]
})
export class AllSchemesComponent implements OnInit {
  schemeData: any;
  allSchemes: SchemeView[];
  searchedSchemes: SchemeView[];
  schemeInfo = 'Schemes are used to (encode <-> decode) (text <-> ciphers)';
  currentLayoutView: LayoutView = LayoutView.GRID;
  layoutView = LayoutView;
  searchQuery: string = '';

  constructor(private cipherbayService: CipherbayService,
    private prompt: PromptService) { }

  ngOnInit(): void {
    this.cipherbayService.getSchemes().subscribe(data => {
      this.schemeData = data;
      this.allSchemes = this.schemeData.schemes;
      this.searchedSchemes = this.allSchemes;
    }, error => {
      this.prompt.error('Oops! Something went wrong while fetching schemes');
    })
  }

  getSince(timestamp: Date) {
    return moment(timestamp).fromNow();
  }

  setLayoutView(viewType: LayoutView) {
    this.currentLayoutView = viewType;
  }

  searchSchemes() {
    if(this.searchQuery && this.searchQuery.length) {
      this.searchedSchemes = this.allSchemes.filter(s => s.alias.toLowerCase().includes(this.searchQuery.toLowerCase()) || s.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    } else {
      this.searchedSchemes = this.allSchemes;
    }
  }

}
