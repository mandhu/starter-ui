import { ButtonComponent } from './button/button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MasterSearchComponent } from './header/master-search/master-search.component';
import { PortalModule } from '../utils/portal/portal.module';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlidePanelModule } from 'ngx-mat-slide-panel';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete/delete-dialog/delete-dialog.component';
import { DeleteButtonComponent } from './delete/delete-button/delete-button.component';




@NgModule({
    declarations: [
        HeaderComponent,
        MasterSearchComponent,
        SearchBarComponent,
        ConfirmComponent,
        DeleteDialogComponent,
        DeleteButtonComponent,
        ButtonComponent
    ],
    imports: [
        CommonModule,
        PortalModule,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSlidePanelModule,
        MatTableModule,
        HttpClientModule,
        MatMenuModule,
        MatDialogModule
    ],
    exports: [
        CommonModule,
        HeaderComponent,
        MasterSearchComponent,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSlidePanelModule,
        SearchBarComponent,
        MatTableModule,
        HttpClientModule,
        MatMenuModule,
        ConfirmComponent,
        MatDialogModule,
        DeleteDialogComponent,
        DeleteButtonComponent,
        ButtonComponent
    ]
})
export class SharedModule { }
