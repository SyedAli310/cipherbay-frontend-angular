import { Component, OnInit, ElementRef } from '@angular/core';
import { faInfoCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { CipherbayService } from 'src/app/services/cipherbay.service';
import { SchemeView } from '../../SchemeView';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-convert-page',
  templateUrl: './convert-page.component.html',
  styleUrls: ['./convert-page.component.scss'],
})
export class ConvertPageComponent implements OnInit {
  //Icons
  faInfo = faInfoCircle;
  faArrowRight = faArrowRight;

  isSchemeModalOpen: boolean = false;
  selectedAlias: string = 'alpha';
  selectedSchemeCode: string = 'scheme_zevqnm-wavv';
  conversionMethod: string = 'encode';
  schemes?: SchemeView[];
  conversionOutput: any = '';
  constructor(
    private el: ElementRef,
    private cipherBayService: CipherbayService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cipherBayService.getSchemes().subscribe((data: any) => {
      this.schemes = data.schemes;
    });
  }

  get inputText() {
    return this.mainConversionForm.get('inputText');
  }

  mainConversionForm = this.formBuilder.group({
    inputText: ['', Validators.required],
  });

  handleSubmit() {
    const input = this.mainConversionForm.get('inputText')?.value;
    const scheme = this.selectedSchemeCode;
    switch (this.conversionMethod) {
      case 'encode':
        this.cipherBayService.encode(scheme, input).subscribe((data: any) => {
          console.log(data);
          this.conversionOutput = data;
        });
        break;
      case 'decode':
        this.cipherBayService.decode(input).subscribe((data: any) => {
          console.log(data);
          this.conversionOutput = data;
        });
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
    this.selectedAlias = scheme.alias;
    this.selectedSchemeCode = scheme.name;
  }

  getSchemeAliasFromCode(schemeCode: string): any {
    if (this.schemes) {
      const scheme = this.schemes.find((scheme) => scheme.name === schemeCode);
      return scheme ? scheme.alias : 'not-found';
    }
  }
}
