import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent implements OnInit {
  @Input() text!: string;
  constructor() {}

  ngOnInit(): void {
    if (!this.text) {
      this.text = 'Loading...';
    }
  }
}
