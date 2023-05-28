import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
    name: 'customDate'
})

export class CustomDatePipe implements PipeTransform {

    transform(timestamp: string): string {
        return moment.utc(timestamp).format('MMM DD, YYYY')
    }
}
