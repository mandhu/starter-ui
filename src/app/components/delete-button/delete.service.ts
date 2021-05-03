import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DeleteService {

    constructor(private http: HttpClient) { }

    delete(url: string, remarks = null): Observable<any> {
        const uri = remarks ? `${url}?remarks=${remarks}` : url;
        return this.http.delete(`${uri}`);
    }
}
