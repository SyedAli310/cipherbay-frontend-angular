// Angular related dependencies imports should be written here
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Third party module imports should be written here
import { NgSelectModule } from '@ng-select/ng-select';

// Our internal application modules and components will be imported here
import { NgxBootstrapModule } from './ngx-bootstrap.module';
// import { LoginComponent, SpinnerComponent, SearchComponent, EmptyViewComponent } from '../components';
import { CustomDatePipe } from '../pipes';
// import {
//     ConfirmDialogComponent,
//     ConfirmDialogService,
// } from '../components/confirm';

import { MomentModule } from 'ngx-moment';
import { EventEmiterService } from '../services';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        NgxBootstrapModule.forRoot(),
        NgSelectModule,
        MomentModule,
        BrowserAnimationsModule
    ],
    declarations: [
        // SpinnerComponent,
        CustomDatePipe,
        // LoginComponent,
        // SearchComponent,
        // EmptyViewComponent,
    ],
    exports: [
        CommonModule,
        NgxBootstrapModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgSelectModule,
        // SpinnerComponent,
        CustomDatePipe,
        // LoginComponent,
        // SearchComponent,
        // EmptyViewComponent,
    ],
    providers: [],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                // ConfirmDialogService,
                EventEmiterService
            ],
        };
    }
}