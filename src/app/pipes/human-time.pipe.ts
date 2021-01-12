import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'humanTime'
})
export class HumanTimePipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        const hours = Math.floor(value / 60);
        const mins = Math.round((value / 60 - hours) * 60);

        return `${hours} hrs ${mins} mins`;
    }

}
