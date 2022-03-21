import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { SchemeView } from 'src/app/SchemeView';

@Component({
  selector: 'app-scheme-modal',
  templateUrl: './scheme-modal.component.html',
  styleUrls: ['./scheme-modal.component.scss'],
})
export class SchemeModalComponent implements OnInit {
  //icons
  faTimes = faTimes;

  selectedScheme: SchemeView = { alias: 'alpha', name: 'scheme_zevqnm-wavv' };
  @Input() isOpen?: boolean;
  @Input() schemes?: SchemeView[];
  @Output() closeModalEvent = new EventEmitter();
  @Output() selectSchemeEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.closeModalEvent.emit();
  }
  selectScheme(scheme: SchemeView) {
    this.selectedScheme = scheme;
    this.selectSchemeEvent.emit(scheme);
  }
}
