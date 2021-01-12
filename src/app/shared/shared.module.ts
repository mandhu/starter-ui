import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {MasterSearchComponent} from './header/master-search/master-search.component';
import {PortalModule} from '../utils/portal/portal.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {HttpClientModule} from '@angular/common/http';
import {ConfirmComponent} from './confirm/confirm.component';
import {DeleteDialogComponent} from './delete/delete-dialog/delete-dialog.component';
import {DeleteButtonComponent} from './delete/delete-button/delete-button.component';
import {FilterPipe} from '../pipes/filter.pipe';
import {MatIcon, MatIconModule} from '@angular/material/icon';


@NgModule({
    declarations: [
        HeaderComponent,
        MasterSearchComponent,
        SearchBarComponent,
        ConfirmComponent,
        DeleteDialogComponent,
        DeleteButtonComponent,
        FilterPipe
    ],
    imports: [
        CommonModule,
        PortalModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatIconModule,
    ],
    exports: [
        CommonModule,
        HeaderComponent,
        MasterSearchComponent,
        ReactiveFormsModule,
        SearchBarComponent,
        HttpClientModule,
        ConfirmComponent,
        DeleteDialogComponent,
        DeleteButtonComponent,
        FilterPipe
    ]
})
export class SharedModule { }
