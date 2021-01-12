import {Component, OnInit} from '@angular/core';
import {RoleService} from '../roles/role.service';
import {PermissionMapService} from '../permission-map/permission-map.service';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material/tree';
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';
import {SelectionModel} from '@angular/cdk/collections';
import {FilterPipe} from '../../../pipes/filter.pipe';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-role-map',
    templateUrl: './role-map.component.html',
    styleUrls: ['./role-map.component.styl']
})
export class RoleMapComponent implements OnInit {

    roles = [];
    menus = [];
    actions = [];
    filterRole = '';
    filterMenu = '';
    actionFilter = '';
    selectedRole = null;
    search = '';

    dataSource = new MatTreeNestedDataSource<any>();
    treeControl = new NestedTreeControl<any>(node => node.children);

    constructor(
        private roleService: RoleService,
        private actionService: PermissionMapService,
        private sb: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.getRoles();
        this.getActions();
        this.getMenus();
    }

    hasChild = (_: number, node: any) =>
        !!node.children && node.children.length > 0

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

    getMenus(): void {
        this.roleService.menus().subscribe(res => {
            this.menus = res.data;
        });
    }

    selectRole(role: any): void {
        this.selectedRole = role;
        this.roleService.menuAndActions(role.id).subscribe(res => {
            this.setMenus(res.data.menus);
            this.setActions(res.data.actions);
        });
    }

    setMenus(roleMenus: any[]): void {
        this.menus = this.menus.map(perm => {
            return {
                ...perm,
                selected: !!roleMenus.find(item => item.id === perm.id)
            };
        });
    }

    setActions(roleActions: any[]): void {
        this.actions = this.actions.map(action => {
            return {
                ...action,
                children: action.children.map(child => ({
                    parent: action,
                    ...child,
                    selected: !!roleActions.find(item => item.id === child.id)
                }))
            };
        });
        this.dataSource.data = this.actions;
    }

    toggleMenu(item: any): void {
        this.roleService.toggleMenu({role_id: this.selectedRole.id, permission_id: item.id}).subscribe((_) => {
            this.selectRole(this.selectedRole);
        });
    }

    toggleAction(node): void {
        node.selected = !node.selected;
        this.actionService.toggleRoleAction(this.selectedRole.id, node.id).subscribe(res => {
            this.sb.open(res.message, 'OK', {duration: 2500});
        });
    }

    toggleParentAction(checked, node): void {
        node.children.forEach(child => {
            child.selected = checked;
        });
        this.actionService.toggleRoleAllAction(this.selectedRole.id, node.id, checked).subscribe(res => {
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
}
