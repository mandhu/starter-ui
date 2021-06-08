import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {HttpClientModule} from '@angular/common/http';
import {FilterPipe} from '../pipes/filter.pipe';
import {MatIconModule} from '@angular/material/icon';
import {PermissionDirective} from '../directive/permission.directive';
import {MatButtonModule} from '@angular/material/button';
import {HeaderModule} from './header/header.module';


@NgModule({
    declarations: [
        SearchBarComponent,
        FilterPipe,
        PermissionDirective,
    ],
    imports: [
        CommonModule,
        HeaderModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        CommonModule,
        HeaderModule,
        ReactiveFormsModule,
        SearchBarComponent,
        HttpClientModule,
        FilterPipe,
        MatButtonModule,
        PermissionDirective
    ]
})
export class SharedModule { }
