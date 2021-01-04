import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { DropdownDirective } from './dropdown.directive';
import { DropdownItemDirective } from './dropdown-item.directive';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-dropdown',
    template: `
        <ng-template>
            <div class="dropdown"
                 [class]="class" [ngClass]="{
                  'small': borderRadius === 'small',
                  'br-medium': borderRadius === 'medium',
                  'br-large': borderRadius === 'large'
              }">
                <ng-content></ng-content>
            </div>
        </ng-template>
    `,
    styleUrls: ['./dropdown.component.styl']
})
export class DropdownComponent implements AfterContentInit{

    @ContentChildren(DropdownItemDirective, {descendants: true}) options: QueryList<DropdownItemDirective>;
    @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;
    @Input() autocomplete = false;
    @Input() panelWidth;
    @Input() panelClass: string;
    @Input() class: string;
    @Input() borderRadius: 'small' | 'medium' | 'large';
    @Input() position: 'auto' | 'above' | 'below' = 'auto';
    @Output() dismiss: EventEmitter<any> = new EventEmitter<any>();
    @Output() onItemClick: EventEmitter<any> = new EventEmitter<any>();
    readonly listenItemClick = new Subject<boolean>();


    constructor() { }


    ngAfterContentInit(): void {
        if (this.options) {
            this.options.changes.pipe(
                startWith(this.options),
                switchMap(() => merge(...this.options.map(option => option.stateChanges)))
            ).subscribe(res => {
                this.onItemClick.emit(res);
                this.listenItemClick.next(true);
            });
        }
    }
}
