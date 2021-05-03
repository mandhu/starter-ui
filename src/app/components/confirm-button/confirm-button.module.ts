import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {ConfirmButtonComponent} from './confirm-button.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import { ConfirmDirective } from './confirm.directive';


@NgModule({
    declarations: [
        ConfirmButtonComponent,
        ConfirmDialogComponent,
        ConfirmDirective
    ],
    imports: [
        CommonModule,
        MatDialogModule,
    ],
    exports: [
        ConfirmButtonComponent,
        ConfirmDialogComponent,
        ConfirmDirective
    ]
})
export class ConfirmButtonModule { }
