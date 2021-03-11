import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'sales',
                loadChildren: () => import('./modules/sales/sales.module').then(m => m.SalesModule)
            },
            {
                path: 'acl',
                loadChildren: () => import('./modules/acl/acl.module').then(m => m.AclModule)
            }
        ]
    },
    // {
    //     path: 'login',
    //     component: LoginComponent
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
