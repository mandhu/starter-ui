import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PortalModule} from '../../utils/portal/portal.module';
import {HeaderComponent} from './header.component';
import {MasterSearchComponent} from './master-search/master-search.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
    declarations: [
        HeaderComponent,
        MasterSearchComponent,
    ],
    imports: [
        CommonModule,
        PortalModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule { }
