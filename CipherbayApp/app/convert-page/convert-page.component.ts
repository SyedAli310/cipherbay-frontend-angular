import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { CipherbayService } from 'CipherbayApp/app/services/cipherbay.service';
import { appearAnimation, LoaderService, PromptService } from '../shared';
import { SchemeView } from '../SchemeView';
import { FormBuilder, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-convert-page',
  templateUrl: './convert-page.component.html',
  animations: [appearAnimation]
})
export class ConvertPageComponent implements OnInit {

  isSchemeModalOpen: boolean = false;
  selectedScheme: SchemeView = JSON.parse(
    localStorage.getItem('selectedScheme')!
  ) || { alias: 'alpha', name: 'scheme_zevqnm-wavv' };
  conversionMethod: string = 'encode';
  schemes: SchemeView[];
  conversionOutput: any = {};
  isLoading: boolean = false;
  hasError: boolean = false;
  selectedSchemeName: string = 'scheme_zevqnm-wavv';
  conversionMode: string = 'encode';
  isSchemesLoading: boolean = false;

  constructor(
    private el: ElementRef,
    private cipherBayService: CipherbayService,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private promptService: PromptService
  ) {
    this.schemes = [];
  }

  @ViewChild('schemeNgSelect') schemeNgSelect: NgSelectComponent;

  ngOnInit(): void {
    if (this.route.data['value'].mode && this.route.data['value'].mode.length) {
      this.setConversion(this.route.data['value'].mode);
    }

    this.getAllSchemes();
    this.selectedSchemeName = this.selectedScheme.name;
  }

  get inputText() {
    return this.mainConversionForm.get('inputText');
  }

  getAllSchemes() {
    this.loaderService.showLoader();
    this.isSchemesLoading = true;
    this.cipherBayService.getSchemes().subscribe(
      (data: any) => {
        this.schemes = data.schemes;
        this.loaderService.hideLoader();
        this.isSchemesLoading = false;
      },
      (error: any) => {
        this.promptService.error('Oh no, There was an error getting schemes');
        this.loaderService.hideLoader();
        this.isSchemesLoading = false;
      }
    );
  }

  mainConversionForm = this.formBuilder.group({
    inputText: ['', Validators.required],
  });

  handleSubmit(outputLoader: HTMLDivElement) {
    const input = this.mainConversionForm.get('inputText')?.value.trim();
    if (!input) {
      this.promptService.info('Please enter some text to convert');
      return;
    }
    const scheme = this.selectedScheme.name;
    let errorToShow = '';
    this.isLoading = true;
    switch (this.conversionMethod) {
      case 'encode':
        this.cipherBayService.encode(scheme, input).subscribe(
          (data: any) => {
            this.isLoading = false;
            this.hasError = false;
            // console.log(data);
            this.conversionOutput = data;
          },
          (error: any) => {
            this.isLoading = false;
            this.hasError = true;

            // console.log(error);

            if (error.status === 0) {
              errorToShow = 'Server is not responding, please try again later';
              this.conversionOutput = { encoded: errorToShow, text: input };
            } else {
              errorToShow = error.error.msg;
              this.conversionOutput = { encoded: errorToShow, text: input };
            }
            // console.log(errorToShow);
            return;
          }
        );
        break;
      case 'decode':
        this.cipherBayService.decode(input).subscribe(
          (data: any) => {
            this.isLoading = false;
            this.hasError = false;

            // console.log(data);
            this.conversionOutput = data;
          },
          (error: any) => {
            this.isLoading = false;
            this.hasError = true;

            // console.log(error);
            if (error.status === 0) {
              errorToShow = 'Server is not responding, please try again later';

              this.conversionOutput = { decoded: errorToShow, code: input };
            } else {
              errorToShow = error.error.msg;
              this.conversionOutput = { decoded: errorToShow, code: input };
            }
            // console.log(errorToShow);

            return;
          }
        );
        break;
      default:
        break;
    }
  }

  setConversion(method: string): void {
    this.conversionMethod = method;
    this.inputText?.setValue('');
  }

  openSchemeModal() {
    this.isSchemeModalOpen = true;
  }

  handleModalClose() {
    this.isSchemeModalOpen = false;
  }
  handleSelectScheme(scheme: SchemeView) {
    this.selectedScheme = scheme;
    localStorage.setItem('selectedScheme', JSON.stringify(scheme));
  }

  getSchemeAliasFromCode(schemeCode: string): any {
    if (this.schemes.length > 0) {
      const scheme = this.schemes.find((scheme) => scheme.name === schemeCode);
      return scheme ? scheme.alias : ' scheme';
    }
  }

  closeDevMsg(el: any) {
    el.remove();
  }

  copyToClipboard(value: string, el: HTMLButtonElement) {
    let x = null;
    if (x) {
      clearTimeout(x);
    }
    navigator.clipboard.writeText(value).then(() => {
      el.innerHTML = '<span class="text-accent"><i class="bi bi-check2 text-accent"></i> copied</span>';
      // el.classList.add('border border-accent');
      x = setTimeout(() => {
      // el.classList.remove('border border-accent');
        el.innerHTML = 'copy';
      }, 2000);
    });
  }

  resetOutput(e: Event) {
    const resetBtn = e.target as HTMLButtonElement;
    this.conversionOutput = {};
    // show success message
    resetBtn.innerHTML = `<i class="bi bi-check2 text-accent"></i>`;
    setTimeout(() => {
      resetBtn.innerHTML = `reset`;
    }, 2000);
  }

  onSchemeChange($event: any) {
    this.handleSelectScheme($event)
  }

  openNgSelect(ngSelect: NgSelectComponent) {
    if(ngSelect.isOpen) {
      ngSelect.close();
      return;
    } 
    if(!ngSelect.isOpen) {
      ngSelect.open();
      return;
    }
  }
}
