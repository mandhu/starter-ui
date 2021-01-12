import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'strReplace'
})
export class StrReplacePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (args) {
            const from = args[0] || '_';
            const to = args[1] || ' ';
            return value.replace(new RegExp(from, 'g'), to);
        }
        return value.replace(/_/g, ' ');
    }

}
