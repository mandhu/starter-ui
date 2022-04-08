import { ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit, Renderer2, ViewChild } from '@angular/core';
import { fadeInLeft, fadeOutLeft } from '../animations/fade';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { OverlayContainer, ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { DropdownDirective } from '../components/dropdown/dropdown.directive';
import {DEFAULT_MENU} from './menu';
import {UserService} from '../modules/acl/user/user.service';
import {NavigationEnd, Router} from '@angular/router';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {MatDialog} from '@angular/material/dialog';
import {NavigationService} from './navigation.service';

interface Menu {
    icon: string;
    link?: string;
    name: string;
    children?: Menu[];
    permissions?: string;
    parent?: boolean;
}

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    animations: [fadeInLeft, fadeOutLeft]
})
export class NavigationComponent implements OnInit {

    @HostBinding('class.dark-theme') darkTheme = false;
    hideSideBar = false;
    activeMenu = null;
    selectedMenu: Menu;
    subMenu = true;
    url = null;
    position = 'left';
    openAside = false;
    private overlay: HTMLElement | null;
    private player: AnimationPlayer;
    private scrollStrategy: ScrollStrategy;
    theme = 'light-theme';
    overlayContainer: OverlayContainer;

    constructor(
        private animationBuilder: AnimationBuilder,
        private changeDetectorRef: ChangeDetectorRef,
        private elementRef: ElementRef,
        private renderer2: Renderer2,
        public useService: UserService,
        private router: Router,
        private dialog: MatDialog,
        public navigationService: NavigationService,
        private scrollStrategyOptions: ScrollStrategyOptions,
        overlayContainer: OverlayContainer
    ) {
        this.scrollStrategy = this.scrollStrategyOptions.block();
        this.theme =  localStorage.getItem('_theme_') || 'light-theme';
        this.overlayContainer = overlayContainer;
        this.applyTheme();
    }


    ngOnInit(): void {
        this.setCurrentActiveMenu(this.router.url);
        this.useService.getSetting();
        this.router.events.subscribe((res: NavigationEnd) => {
            this.setCurrentActiveMenu(res.url);
            if (this.openAside && res instanceof NavigationEnd) {
                this.openAside = false;
                this.hideAOverlay();
            }
        });
    }

    private setCurrentActiveMenu(url): void {
        if (url) {
            this.url = url;
            const urls = url.split('/');
            this.activeMenu = urls[1] || 'dashboard';
            // this.selectedMenu = this.userMenus.find(menu => menu.key === this.activeMenu);
            this.selectedMenu = this.navigationService.getActiveMenu(this.activeMenu);
            this.subMenu = this.navigationService.desktop && this.selectedMenu?.children?.length > 0;
        }
    }

    openAsidePanel(item: Menu): void {
        if (this.selectedMenu === item && this.openAside) {
            return;
        }

        this.selectedMenu = item;
        if (!item.children.length) {
            this.handleOverlayClick();
            this.router.navigate([item.link]);
            return;
        }

        if (this.navigationService.desktop) {
            this.subMenu = true;
        } else {
            this.openAside = true;
            if (this.openAside) {
                this.showOverlay();
            } else {
                this.hideAOverlay();
            }
        }
    }

    toggle(): void {
        if (this.subMenu) {
            this.subMenu = false;
        } else {
            this.hideSideBar = !this.hideSideBar;
        }
    }

    handleOverlayClick(): void {
        this.openAside = false;
        this.hideAOverlay();
    }

    showOverlay(): void {
        if (this.overlay) {
            return;
        }

        this.overlay = this.renderer2.createElement('div');

        this.overlay.classList.add('navigation-overlay');

        this.renderer2.appendChild(this.elementRef.nativeElement.parentElement, this.overlay);

        this.scrollStrategy.enable();

        this.player =
            this.animationBuilder
                .build([
                    animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({opacity: 1}))
                ]).create(this.overlay);

        // Play the animation
        this.player.play();

        this.overlay.addEventListener('click', this.handleOverlayClick.bind(this));

    }

    hideAOverlay(): void {
        if ( !this.overlay ) {
            return;
        }

        this.player =
            this.animationBuilder
                .build([
                    animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({opacity: 0}))
                ]).create(this.overlay);

        this.player.play();

        this.player.onDone(() => {

            if ( this.overlay )  {
                this.overlay.removeEventListener('click', this.handleOverlayClick.bind(this));

                this.overlay.parentNode.removeChild(this.overlay);
                this.overlay = null;
            }
        });
    }

    changePassword(disableClose = false): void {
        this.dialog.open(ChangePasswordComponent, {
            data: {disableClose},
            width: '500px',
            disableClose
        });
    }

    logout(): void {
        this.useService.logout();
    }

    changeTheme(): void {
        this.theme = this.theme === 'light-theme' ? 'dark-theme' : 'light-theme';
        this.applyTheme();
        localStorage.setItem('_theme_', this.theme);
    }

    applyTheme(): void {
        this.darkTheme = this.theme === 'dark-theme';
        if (this.theme === 'dark-theme') {
            this.overlayContainer.getContainerElement().classList.add(this.theme);
        } else {
            this.overlayContainer.getContainerElement().classList.remove('dark-theme');
        }
    }
}
