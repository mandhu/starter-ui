import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeleteButtonComponent} from './delete-button/delete-button.component';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
    declarations: [
        DeleteButtonComponent,
        DeleteDialogComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
    ],
    exports: [
        DeleteButtonComponent
    ]
})
export class DeleteButtonModule { }
