import {Injectable} from '@angular/core';
import {DEFAULT_MENU, Menu} from './menu';
import {BehaviorSubject} from 'rxjs';
import {UserService} from '../modules/acl/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    menu: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>(DEFAULT_MENU);
    desktop = window.innerWidth > 1000;

    constructor(
        private userService: UserService
    ) {
        // this.userMenu = this.navigationService.menu;
        // this.userService.userPermissions.subscribe((permissions: string[]) => {
        //     if (permissions.length) {
        //         this.buildMenu(permissions);
        //     }
        // });
    }

    getActiveMenu(url): Menu {
        return this.menu.value.find(menu => menu.key === url);
    }

    buildMenu(permissions: any, desktop = true): void {
        const updateMenu = this.menu.value.map((menu: Menu) => {
            // console.log(menu);
            if (menu.children.length) {
                const childMenus = menu.children.map(child => {
                    if (child.parent) {
                        const childMenu = child.children.map(kid => {
                            if (!!permissions.find(perm => perm === kid.permissions)) {
                                return kid;
                            }
                        }).filter(item => item);
                        return {
                            ...child,
                            children: childMenu
                        };
                    } else {
                        if (!!permissions.find(perm => perm === child.permissions)) {
                            return child;
                        }
                    }
                }).filter(item => {
                    if (!item) {
                        return false;
                    }
                    if (!item.parent) {
                        return true;
                    }
                    return !!item.children.length;
                });

                let link = '/';

                if (desktop) {
                    if (childMenus.length) {
                        if (childMenus[0].parent) {
                            link = childMenus[0].children[0].link;
                        } else {
                            link = childMenus[0].link;
                        }
                    }
                } else {
                    link = '';
                }

                return {
                    ...menu,
                    link,
                    children: childMenus
                };
            } else {
                if (!!permissions.find(perm => perm === menu.permissions)) {
                    return menu;
                }
            }

        }).filter(item => item);
        this.menu.next(updateMenu);
    }

    updateCount(key: string, count: number): void {
        // this.menu = this.menu.map((menu: Menu) => {
        //     if (menu.key === key) {
        //         return {
        //             ...menu,
        //             count
        //         };
        //     }
        //     return menu;
        // });
    }
}
