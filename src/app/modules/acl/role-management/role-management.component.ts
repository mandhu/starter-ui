import {Component, OnInit} from '@angular/core';
import {RoleService} from '../roles/role.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PermissionMapService} from '../permission-map/permission-map.service';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatSlidePanel} from 'ngx-mat-slide-panel';
import {RoleUsersComponent} from './role-users/role-users.component';
import {UserService} from '../user/user.service';

@Component({
    selector: 'app-role-management',
    templateUrl: './role-management.component.html',
    styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {

    users = [];
    roles = [];
    actions = [];
    selectedUser = null;
    search = '';
    filterUser = '';
    filterRole = '';
    dataSource = new MatTreeNestedDataSource<any>();
    treeControl = new NestedTreeControl<any>(node => node.children);

    constructor(private userService: UserService,
                private roleService: RoleService,
                private actionService: PermissionMapService,
                private sb: MatSnackBar,
                private panel: MatSlidePanel,
                ) { }

    ngOnInit(): void {
        this.getUsers();
        this.getRoles();
        this.getActions();
    }

    getUsers(): void {
        this.userService.list({all:true}).subscribe(res => {
            this.users = res.data;
        });
    }

    getRoles(): void {
        this.roleService.list({all: true}).subscribe(res => {
            this.roles = res.data;
        });
    }

    getActions(): void {
        this.actionService.list().subscribe(res => {
            this.actions = res.data;
            this.dataSource.data = res.data;
        });
    }

    selectUser(item: any): void {
        this.selectedUser = item;
        this.userService.getUserRoles(item.id).subscribe(res => {
           this.setRoles(res.data.roles);
           this.setActions(res.data.actions);
        });
    }

    setRoles(userRoles: any[]): void {
        this.roles = this.roles.map(role => {
            return {
                ...role,
                selected: !!userRoles.find(item => item.id === role.id)
            };
        });
    }

    setActions(userActions: any[]): void {
        this.actions = this.actions.map(action => {
            return {
                ...action,
                children: action.children.map(child => ({
                    parent: action,
                    ...child,
                    selected: !!userActions.find(item => item.id === child.id)
                }))
            };
        });
        this.dataSource.data = this.actions;
    }

    toggleRole(role: any): void {
        this.userService.toggleUserRole(this.selectedUser.id, role.id).subscribe(res => {
            this.sb.open(res.message, 'OK', {duration: 2500});
            this.selectUser(this.selectedUser);
        });
    }

    hasChild = (_: number, node: any) =>
        !!node.children && node.children.length > 0

    toggleAction(node): void {
        node.selected = !node.selected;
        this.userService.toggleUserAction(this.selectedUser.id, node.id).subscribe(res => {
            this.sb.open(res.message, 'OK', {duration: 2500});
        });
    }

    toggleParentAction(checked, node): void {
        node.children.forEach(child => {
            child.selected = checked;
        });
        this.userService.toggleUserAllAction(this.selectedUser.id, node.id, checked).subscribe(res => {
            this.sb.open(res.message, 'OK', {duration: 2500});
        });
    }

    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node: any): boolean {
        const descendants = this.treeControl.getDescendants(node);
        return descendants.length > 0 && descendants.every(child => {
            return child?.selected;
        });
    }

    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: any): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => child?.selected);
        return result && !this.descendantsAllSelected(node);
    }

    filterChanged(value: any): void {
        this.search = value;
        this.setChildOk(value, this.dataSource.data);
    }

    setChildOk(text: string, node: any): void {
        node.forEach(x => {
            x.ok = x.name.toLowerCase().indexOf(text.toLocaleLowerCase()) >= 0;
            if (x?.parent) { this.setParentOk(text, x.parent, x.ok); }
            if (x?.children) { this.setChildOk(text, x.children); }
        });
    }
    setParentOk(text, node, ok): void {
        node.ok = ok || node.ok || node.name.toLowerCase().indexOf(text.toLocaleLowerCase()) >= 0;
        if (node.parent) { this.setParentOk(text, node.parent, node.ok); }
    }

    showRoleUsers(role: any): void {
        this.panel.open(RoleUsersComponent, {
            data: role
        });
    }
}
