import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {ConfirmButtonComponent} from './confirm-button.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';


@NgModule({
    declarations: [
        ConfirmButtonComponent,
        ConfirmDialogComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
    ],
    exports: [
        ConfirmButtonComponent,
        ConfirmDialogComponent
    ]
})
export class ConfirmButtonModule { }
