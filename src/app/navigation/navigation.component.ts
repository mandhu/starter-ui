import { ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit, Renderer2, ViewChild } from '@angular/core';
import { fadeInLeft, fadeOutLeft } from '../animations/fade';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { OverlayContainer, ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { DropdownDirective } from '../components/dropdown/dropdown.directive';

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
    styleUrls: ['./navigation.component.styl'],
    animations: [fadeInLeft, fadeOutLeft]
})
export class NavigationComponent implements OnInit {

    @HostBinding('class.dark-theme') darkTheme = false;
    hideSideBar = false;
    activeMenu = null;
    selectedMenu: Menu;
    menus: Menu[]  = [
        {
            icon: 'tachometer-alt',
            link: '/',
            name: 'Dashboard',
            children: []
        },
        {
            icon: 'file-invoice-dollar',
            link: '/sales',
            name: 'Sales',
            children: []
        },
        {
            icon: 'shield-check',
            link: '/',
            name: 'ACL',
            parent: true,
            permissions: null,
            children: [
                {
                    icon: 'users-cog',
                    link: '/',
                    name: 'Manage',
                    parent: true,
                    children: [
                        {
                            icon: 'user-lock',
                            link: '/acl/permission-map',
                            name: 'Permission Map',
                            children: [],
                            permissions: 'permission_map'
                        },
                        {
                            icon: 'user-lock',
                            link: '/acl/role-map',
                            name: 'Role Map',
                            children: [],
                            permissions: 'role_map'
                        },
                        {
                            icon: 'user-lock',
                            link: '/acl/role-management',
                            name: 'Role Management',
                            children: [],
                            permissions: 'role_management'
                        },
                    ],
                    permissions: null
                },
                {
                    icon: 'user-lock',
                    link: '/acl/users',
                    name: 'Users',
                    children: [],
                    permissions: 'users',
                    parent: false,
                },
                {
                    icon: 'lock-alt',
                    link: '/acl/roles',
                    name: 'Roles',
                    children: [],
                    permissions: 'roles',
                    parent: false,
                },
            ],
        },
    ];
    url = null;
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
        private scrollStrategyOptions: ScrollStrategyOptions,
        overlayContainer: OverlayContainer
    ) {
        this.scrollStrategy = this.scrollStrategyOptions.block();
        this.theme =  localStorage.getItem('_theme_') || 'light-theme';
        this.overlayContainer = overlayContainer;
        this.applyTheme();
    }


    ngOnInit(): void {

    }

    openAsidePanel(item: Menu): void {
        if (this.selectedMenu === item && this.openAside) {
            this.handleOverlayClick();
            return;
        }

        this.selectedMenu = item;

        this.openAside = true;
        if (this.openAside) {
            this.showOverlay();
        } else {
            this.hideAOverlay();
        }
    }

    toggle(): void {
        this.hideSideBar = !this.hideSideBar;
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

    changePassword(): void {
    }

    logout(): void {

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
