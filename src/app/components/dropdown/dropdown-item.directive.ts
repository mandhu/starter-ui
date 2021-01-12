import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
    selector: '[dropdownItem]',
    exportAs: 'dropdownItem'
})
export class DropdownItemDirective {

    readonly stateChanges = new Subject<boolean>();

    constructor() {
    }

    @HostListener('click')
    click(): void {
        this.stateChanges.next(true);
    }

}
