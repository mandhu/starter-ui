import { NgModule } from '@angular/core';
import { PortalTargetDirective } from './portal-target.directive';
import { PortalAttachDirective } from './portal-attach.directive';


@NgModule({
    declarations: [
        PortalTargetDirective,
        PortalAttachDirective
    ],
    imports: [
    ],
    exports: [
        PortalTargetDirective,
        PortalAttachDirective
    ]
})
export class PortalModule { }
