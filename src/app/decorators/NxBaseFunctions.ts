import { BehaviorSubject } from 'rxjs';
import { Params } from '@angular/router';
import { NxDataSource } from './NxDataSource';
import { EventEmitter } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {DeleteDialogComponent} from '../components/delete-button/delete-dialog/delete-dialog.component';


export interface NxBaseFunctions {
    nxDataSource: NxDataSource | null;
    dataSubject: BehaviorSubject<any[]>;
    queryParams: Params | null;
    title: string | null;
    data: any | null;

    loadData(params?: object): void;

    change(event: PageEvent): void;

    sortData(event: EventEmitter<Sort>): void;

    getUpdatedRouteParams(newParams: object): Params;

    addOrUpdate(items?: object): void;

    delete(id: number, name: string): void;

    print(id, type): void;
}

export function NxBaseFunctions({serviceName, title, formComponent}): any {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        const component = target.name;
        const original = target.prototype.ngOnInit;

        target.prototype.title = title;

        target.prototype.data = null;
        target.prototype.queryParams = null;
        target.prototype.dataSubject = new BehaviorSubject<any[]>([]);
        target.prototype.nxDataSource = new NxDataSource(target.prototype.dataSubject);

        target.prototype.ngOnInit = function(...args) {
            const exceptions = validationCheck([
                'activatedRoute',
                serviceName
            ], this, component);
            if (exceptions.length) {
                exceptions.forEach(exception => console.error(exception));
                return;
            }
            this.activatedRoute.queryParamMap.subscribe(paramsMap => {
                target.prototype.queryParams = this.activatedRoute.snapshot.queryParams;
                // if (paramsMap.has('add') && paramsMap.get('add')) {
                //     this.addOrUpdate();
                // }
                if (paramsMap.has('search') && paramsMap.get('search')) {
                    this.loadData({...this.queryParams, search: paramsMap.get('search')});
                } else {
                    this.loadData(this.queryParams);
                }
            });

            original.apply(this, args);
        };

        target.prototype.change = function(ev) {
            this.loadData(this.getUpdatedRouteParams({page: ev.pageIndex + 1, pageSize: ev.pageSize}));
        };

        target.prototype.sortData = function(ev) {
            this.loadData(this.getUpdatedRouteParams({orderBy: ev.active, sortedBy: ev.direction}));
        };

        target.prototype.loadData = function(params?) {
            this[serviceName].list(params).subscribe(res => {
                target.prototype.data = res.data;
                target.prototype.dataSubject.next(res.data.data);
            }, error => {
                console.error('OOps!!');
            });
        };

        target.prototype.getUpdatedRouteParams = function(newParams: object) {
            return this.queryParams = {...this.queryParams, ...newParams};
        };

        target.prototype.delete = function(id, name) {
            const dialogRef = this.dialog.open(DeleteDialogComponent, {
                data: {
                    id,
                    title: `Delete ${name}!`,
                    service: this[serviceName]
                },
                width: '450px'
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.sb.open(result.message, 'OK');
                    this.loadData(this.queryParams);

                    // this[serviceName].delete(id).subscribe(res => {
                    //     this.sb.open(res.message, 'OK');
                    //     this.loadData(this.queryParams);
                    // });
                }
            });
        };

        target.prototype.addOrUpdate = function(item = null): void {
            setTimeout(() => {
                const panel = this.panel.open(formComponent, {
                    width: '450px',
                    data: item
                });

                panel.afterDismissed().subscribe(result => {
                    if (result) {
                        this.loadData(this.queryParams);

                        // if(!result.updated) {
                        // if (result.id) {
                        //     this[serviceName].update(result).subscribe(res => {
                        //         this.sb.open(res.message, 'OK');
                        //         this.loadData(this.queryParams);
                        //     });
                        // } else {
                        //     this[serviceName].add(result).subscribe(res => {
                        //         this.sb.open(res.message, 'OK');
                        //         this.loadData(this.queryParams);
                        //     });
                        // }
                        // }
                    }
                    // this.router.navigate([], {queryParams: {...this.queryParams, add: null}});
                });
            });
        };
        return target;
    };
}

function validationCheck(names: string[], instance, component): string[] {
    let errors = [];
    names.forEach(name => {
        if (!instance[name]) {
            errors = [...errors, `Injector ${name} not found on instance of ${component}`];
        }
    });
    return errors;
}
