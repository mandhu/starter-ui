import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PortalService {
  private targets: Map<string, ViewContainerRef> = new Map<string, ViewContainerRef>();

  constructor() { }

  addTarget(name: string, view: ViewContainerRef): void {
    this.targets.set(name, view);
  }

  attach(name: string, templateRef: TemplateRef<any>): void {
    this.getTarget(name).createEmbeddedView(templateRef);
  }

  detach(name: string): void {
    this.getTarget(name).clear();
  }

  private getTarget(name: string): ViewContainerRef | null {
    return this.targets.has(name) ? this.targets.get(name) : null;
  }
}
