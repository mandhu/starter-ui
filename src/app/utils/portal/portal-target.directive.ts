import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PortalService } from './portal.service';

@Directive({
  selector: '[appPortalTarget]'
})
export class PortalTargetDirective implements OnInit {
  @Input('appPortalTarget') target: string;

  constructor(
    private portalService: PortalService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.portalService.addTarget(this.target, this.viewContainerRef);
  }

}
