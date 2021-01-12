import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    constructor() { }

    setLoading(status: boolean): void {
        this.loading$.next(status);
    }
}
