import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { CipherbayService } from 'CipherbayApp/app/services/cipherbay.service';
import { LoaderService } from '../shared';
import { SchemeView } from '../SchemeView';
import { FormBuilder, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-convert-page',
  templateUrl: './convert-page.component.html'
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

  constructor(
    private el: ElementRef,
    private cipherBayService: CipherbayService,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
  ) {
    this.schemes = [];
  }

  @ViewChild('schemeNgSelect') schemeNgSelect: NgSelectComponent;

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.cipherBayService.getSchemes().subscribe(
      (data: any) => {
        this.schemes = data.schemes;
        this.loaderService.hideLoader();
      },
      (error: any) => {
        // console.log(error);
        this.loaderService.hideLoader();
      }
    );
    // console.log(this.conversionOutput);

    this.selectedSchemeName = this.selectedScheme.name;

    const conversionMode = this.route.snapshot.data['mode'];
    console.log(conversionMode);
    
    if(conversionMode) {
      this.setConversion(conversionMode);
    }
  }

  get inputText() {
    return this.mainConversionForm.get('inputText');
  }

  mainConversionForm = this.formBuilder.group({
    inputText: ['', Validators.required],
  });

  handleSubmit(outputLoader: HTMLDivElement) {
    const input = this.mainConversionForm.get('inputText')?.value.trim();
    if (!input) {
      alert('Please enter some text to convert');
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
      el.innerHTML = '&#x2713; copied';
      el.classList.add('success');
      x = setTimeout(() => {
        el.classList.remove('success');
        el.innerHTML = 'copy';
      }, 2000);
    });
  }

  resetOutput(e: Event) {
    const resetBtn = e.target as HTMLButtonElement;
    this.conversionOutput = {};
    // show success message
    resetBtn.classList.add('success');
    setTimeout(() => {
      resetBtn.classList.remove('success');
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
