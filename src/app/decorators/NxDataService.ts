import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

export interface NxDataService<T> {
  list(params?: object, url?: string): Observable<any>;

  get(id: number, params?, newUrl?: string): Observable<any>;

  add(T): Observable<any>;

  save(T): Observable<any>;

  update(T): Observable<any>;

  delete(num, url?): Observable<any>;

  query(T): Observable<any>;

}

export function NxDataService({url}): any {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        target.prototype.list = function(params?) {
            const httpParams = new HttpParams({
                fromObject: {
                ...params
                }
            });
            return this.http.get(`${url}?${httpParams.toString()}`);
        };

        target.prototype.get = function(id: number, params?) {
            const httpParams = new HttpParams({
                fromObject: {
                ...params
                }
            });
            return this.http.get(`${url}/${id}?${httpParams.toString()}`);
        };

        target.prototype.add = function(data: any) {
            return this.http.post(url, data);
        };

        target.prototype.save = function(data: any)  {
            if (data.id) {
                return this.http.put(`${url}/${data.id}`, data);
            }
            return this.http.post(url, data);
        };

        target.prototype.update = function(data: any) {
            return this.http.put(`${url}/${data.id}`, data);
        };

        target.prototype.delete = function(id: number) {
            return this.http.delete(`${url}/${id}`);
        };

        target.prototype.query = function(apiUrl: string) {
            return this.http.get(`${apiUrl}`);
        };

        return target;
    };
}

// export interface NxResponse<T> {
//   data: any | T[];
//   message: string;
//   success: boolean;
// }

export interface NxResponse {
    data: any;
    message: string;
    success: boolean;
}


