import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject} from 'rxjs';

export class NxDataSource extends DataSource<any> {
    constructor(private subject: BehaviorSubject<any[]>) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.subject.asObservable();
    }

    disconnect(): void {

    }
}
