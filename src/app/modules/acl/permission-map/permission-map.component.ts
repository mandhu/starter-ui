import {Component, OnInit} from '@angular/core';
import {PermissionMapService} from './permission-map.service';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

@Component({
    selector: 'app-permission-map',
    templateUrl: './permission-map.component.html',
    styleUrls: ['./permission-map.component.scss']
})
export class PermissionMapComponent implements OnInit {

    filterPermissions = '';
    selectedAction = null;
    mappedPermissions = [];
    allPermissions = [];

    private _transformer = (node: any, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            level,
            ...node
        };
    }

    treeFlattener: MatTreeFlattener<any, any, any> = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.children);

    treeControl = new FlatTreeControl<any>(
        node => node.level, node => node.expandable);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    constructor(private service: PermissionMapService) { }

    ngOnInit(): void {
        this.service.list().subscribe(res => {
            this.dataSource.data = res.data;
        });
        this.service.permissions().subscribe(res => {
            this.allPermissions = res.data;
        });
    }

    hasChild = (_: number, node: any) => node.expandable;


    selectAction(node): void {
        this.selectedAction = node;
        this.service.mappedPermissions(node.id).subscribe(res => {
            this.mappedPermissions = res.data;
            this.setPermissions(res.data);
        });
    }

    setPermissions(mappedPermissions: any[]): void {
        this.allPermissions = this.allPermissions.map(perm => {
           return {
               ...perm,
               selected: !!mappedPermissions.find(item => item.permission_id === perm.id)
           };
        });
    }

    mapPermission(item: any): void {
        if (item?.selected) return;
        this.service.mapPermission({action_id: this.selectedAction.id, permission_id: item.id}).subscribe(res => {
            this.selectAction(this.selectedAction);
        });
    }
}
