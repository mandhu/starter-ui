import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeleteButtonComponent} from './delete-button/delete-button.component';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { DeleteDirective } from './delete.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
    declarations: [
        DeleteButtonComponent,
        DeleteDialogComponent,
        DeleteDirective
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        DeleteButtonComponent,
        DeleteDirective
    ]
})
export class DeleteButtonModule { }
