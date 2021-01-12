import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { PortalModule } from './utils/portal/portal.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { DropDownModule } from './components/dropdown/dropdown.module';
import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from './shared/shared.module';
import { CollapseItemComponent } from './navigation/collapse-item/collapse-item.component';
import { CollapseItemDirective } from './navigation/collapse-item/collapse-item.directive';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        DashboardComponent,
        CollapseItemComponent,
        CollapseItemDirective,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        PortalModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        HttpClientModule,
        DropDownModule,
        MatRippleModule,
        MatSlideToggleModule,
        SharedModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
