import { NgModule, ModuleWithProviders } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';
@NgModule({
    imports: [
        TypeaheadModule.forRoot(),
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot(),
        PopoverModule.forRoot(),
        TabsModule.forRoot(),
        CollapseModule.forRoot(),
        TimepickerModule.forRoot(),
        AccordionModule.forRoot(),
    ],
    exports: [
        TypeaheadModule,
        ModalModule,
        TooltipModule,
        BsDropdownModule,
        BsDatepickerModule,
        PopoverModule,
        TabsModule,
        CollapseModule,
        TimepickerModule,
        AccordionModule,
    ],
    providers: [],
    declarations: [],
})
export class NgxBootstrapModule {
    static forRoot(): ModuleWithProviders<NgxBootstrapModule> {
        return {
            ngModule: NgxBootstrapModule,
            providers: [],
        };
    }
}