import { Directive, ElementRef, HostListener, Inject, Input, OnDestroy, OnInit, Optional, ViewContainerRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    ConnectedPosition,
    FlexibleConnectedPositionStrategy,
    Overlay,
    OverlayConfig,
    OverlayRef,
    PositionStrategy,
    ScrollStrategy,
    ScrollStrategyOptions
} from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { DropdownComponent } from './dropdown.component';


@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[dropdown]',
    exportAs: 'dropdown'
})
export class DropdownDirective implements OnInit, OnDestroy {

    @Input('dropdown') dropdown: DropdownComponent;
    private overlayRef: OverlayRef | null;
    private portal: TemplatePortal;
    private readonly scrollStrategy: ScrollStrategy;
    private backdropSubscription = Subscription.EMPTY;
    private positionStrategy: FlexibleConnectedPositionStrategy;

    @HostListener('click')
    onClick(): void {
        if (!this.overlayRef) {
            this._attachOverlay();
        } else {
            if (!this.dropdown.autocomplete) {
                this._detachOverlay();
            }
        }
    }

    constructor(private elementRef: ElementRef<HTMLInputElement>,
                private overlay: Overlay,
                private readonly sso: ScrollStrategyOptions,
                private viewContainerRef: ViewContainerRef,
                @Optional() @Inject(DOCUMENT) private document: any) {
        this.scrollStrategy = this.sso.reposition();
    }

    ngOnInit(): void {
        this.dropdown.listenItemClick.subscribe(res => {
            this._detachOverlay();
        });
    }


    public _detachOverlay(): void {
        if (!this.overlayRef) {
            return;
        }
        this.overlayRef.dispose();
        this.overlayRef = null;
        this.dropdown.dismiss.emit(true);
    }

    private _attachOverlay(): void {

        let overlayRef = this.overlayRef;

        if (!overlayRef) {
            this.portal = new TemplatePortal(this.dropdown.template, this.viewContainerRef);
            overlayRef = this.overlay.create(this._getOverlayConfig());
            this.overlayRef = overlayRef;
        }

        if (overlayRef && !overlayRef.hasAttached()) {
            overlayRef.attach(this.portal);
            this.backdropSubscription = this.overlayRef.backdropClick().subscribe(event => {
                this._detachOverlay();
            });
        }
    }

    private _getOverlayConfig(): OverlayConfig {
        return new OverlayConfig({
            positionStrategy: this._getOverlayPosition(),
            scrollStrategy: this.scrollStrategy,
            minWidth: this._getPanelWidth(),
            panelClass: this.dropdown.panelClass || '',
            hasBackdrop: true,
            backdropClass: 'no-overlay-backdrop'
        });
    }

    private _getPanelWidth(): number | string {
        return this.dropdown.panelWidth || `${this.elementRef.nativeElement.clientWidth}px`;
    }

    private _getOverlayPosition(): PositionStrategy {
        const strategy = this.overlay.position()
            .flexibleConnectedTo(this.elementRef)
            .withFlexibleDimensions(false)
            .withPush(false);

        this._setStrategyPositions(strategy);
        this.positionStrategy = strategy;
        return strategy;
    }

    private _setStrategyPositions(positionStrategy: FlexibleConnectedPositionStrategy): void {
        const belowPositions: ConnectedPosition[] = [
            {originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top'},
            {originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top'}
        ];
        const panelClass = 'dropdown-above';
        const abovePositions: ConnectedPosition[] = [
            {originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', panelClass},
            {originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', panelClass}
        ];

        let positions: ConnectedPosition[];

        if (this.dropdown.position === 'above') {
            positions = abovePositions;
        } else if (this.dropdown.position === 'below') {
            positions = belowPositions;
        } else {
            positions = [...belowPositions, ...abovePositions];
        }

        positionStrategy.withPositions(positions);
    }

    ngOnDestroy(): void {
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }

        this.backdropSubscription.unsubscribe();
    }

}
