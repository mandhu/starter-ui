import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { DropdownDirective } from './dropdown.directive';
import { DropdownItemDirective } from './dropdown-item.directive';



@NgModule({
    declarations: [
        DropdownComponent,
        DropdownDirective,
        DropdownItemDirective
    ],
    exports: [
        DropdownDirective,
        DropdownComponent,
        DropdownItemDirective
    ],
    imports: [
        CommonModule
    ]
})
export class DropDownModule { }
