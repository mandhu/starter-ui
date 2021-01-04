import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseService {
  url: string;

  constructor(public http: HttpClient) {
  }

  list(): Observable<any> {
      return this.http.get<any>(this.url);
  }
}
