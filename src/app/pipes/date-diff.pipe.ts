import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'dateDiff'
})
export class DateDiffPipe implements PipeTransform {

    transform(value: Date, args?: string | number): string | number {

        const a = moment(Date.now());
        const b = moment(value);

        if (args && args[0] === 'Y') {
            const diff = a.diff(b, 'year');
            return `${diff} Year${diff > 1 ? 's' : ''}`;
        }


        const years = a.diff(b, 'year');
        b.add(years, 'years');

        const months = a.diff(b, 'months');
        b.add(months, 'months');

        const days = a.diff(b, 'days');

        let result = '';
        if (years > 1) {
            result = `${result}${years} year${years > 1 ? 's' : ''} `;
        }
        if (months > 1) {
            result = `${result}${months} month${months > 1 ? 's' : ''} `;
        }
        if (days > 1) {
            result = `${result}${days} day${days > 1 ? 's' : ''}`;
        }

        return result;
    }

}
