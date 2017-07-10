import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { IRow } from './row.interface';

@Injectable()
export class HttpService {
  private url: string = 'http://5960f7be29a482001111e5c8.mockapi.io/rows';

  /**
   * @param {Http} http
   */
  constructor( private http: Http ) {}

  /**
   * @returns {Observable<Response>}
   */
  public fetchAll(): Observable<any> {
    return this.http.get(this.url);
  }

  /**
   * @param {any} item
   * @returns {Observable<Response>}
   */
  public update(item: IRow): Observable<any> {
    const headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    const options: RequestOptions = new RequestOptions({ headers: headers });
    const body: string = JSON.stringify(item);
    return this.http.put(`${this.url}/${item.id}`, body, options);
  }
}
