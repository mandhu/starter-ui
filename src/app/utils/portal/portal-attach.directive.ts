import { AfterViewInit, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PortalService } from './portal.service';

@Directive({
  selector: '[appPortalAttach]'
})
export class PortalAttachDirective implements OnInit, OnDestroy {
  @Input('appPortalAttach') target: string;

  constructor(
    private portalService: PortalService,
    private templateRef: TemplateRef<any>
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.portalService.attach(this.target, this.templateRef);
    }, 0);
  }

  ngOnDestroy(): void {
    this.portalService.detach(this.target);
  }

}
