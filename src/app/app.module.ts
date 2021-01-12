import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './navigation/navigation.component';
import {PortalModule} from './utils/portal/portal.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatMenuModule} from '@angular/material/menu';
import {DropDownModule} from './components/dropdown/dropdown.module';
import {MatRippleModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {SharedModule} from './shared/shared.module';
import {CollapseItemComponent} from './navigation/collapse-item/collapse-item.component';
import {CollapseItemDirective} from './navigation/collapse-item/collapse-item.directive';
import {HttpRequestInterceptor} from './core/interceptors/http-reuqest.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';

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
        MatSnackBarModule,
        SharedModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
