import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { SchemeView } from 'src/app/SchemeView';
import { CipherbayService } from 'src/app/services/cipherbay.service';

@Component({
  selector: 'app-scheme-modal',
  templateUrl: './scheme-modal.component.html',
  styleUrls: ['./scheme-modal.component.scss'],
})
export class SchemeModalComponent implements OnInit {
  //icons
  faTimes = faTimes;

  @Input() selectedScheme!: SchemeView;
  @Input() isOpen?: boolean;
  @Input() schemes!: SchemeView[];
  @Output() closeModalEvent = new EventEmitter();
  @Output() selectSchemeEvent = new EventEmitter();
  constructor(private cipherBayService: CipherbayService) {}

  ngOnInit(): void {}

  closeModal() {
    this.closeModalEvent.emit();
  }
  selectScheme(scheme: SchemeView) {
    this.selectedScheme = scheme;
    this.selectSchemeEvent.emit(scheme);
  }

  fetchSchemes(failure: HTMLParagraphElement) {
    failure.innerHTML = 'loading...';
    this.cipherBayService.getSchemes().subscribe(
      (data: any) => {
        this.schemes = data.schemes;
        failure.innerHTML = '';
      },
      (error: any) => {
        failure.innerHTML = 'failed to load schemes -> ' + error.statusText;
      }
    );
  }
}
