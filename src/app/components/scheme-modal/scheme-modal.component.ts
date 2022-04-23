import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SchemeView } from 'src/app/SchemeView';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CipherbayService } from 'src/app/services/cipherbay.service';

@Component({
  selector: 'app-scheme-modal',
  templateUrl: './scheme-modal.component.html',
  styleUrls: ['./scheme-modal.component.scss'],
})
export class SchemeModalComponent implements OnInit {
  //icons
  faTimes = faTimes;
  faSearch = faSearch;

  @Input() selectedScheme!: SchemeView;
  @Input() isOpen?: boolean;
  @Input() schemes!: SchemeView[];
  @Output() closeModalEvent = new EventEmitter();
  @Output() selectSchemeEvent = new EventEmitter();

  isSearchSchemeFormVisible: boolean = false;

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

  searchSchemeForm = new FormGroup({
    search: new FormControl(''),
  });

  searchScheme() {
    const searchQuery = this.searchSchemeForm.get('search')?.value;
    const schemeList = document.querySelectorAll('.scheme-select-btn');
    schemeList.forEach((scheme: any) => {
      const schemeName = scheme.innerHTML;
      if (schemeName.includes(searchQuery)) {
        scheme.style.display = 'block';
      } else {
        scheme.style.display = 'none';
      }
    });
  }

  toggleSearchForm() {
    this.isSearchSchemeFormVisible = !this.isSearchSchemeFormVisible;
  }
}
