import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
    private httpOptions: any;
    constructor(private httpClient: HttpClient) {
        this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) };
    }

    get<T>(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.httpClient.get<T>(`${path}`, { params });
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.httpClient.post(`${path}`, JSON.stringify(body), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.httpClient.put(`${path}`, JSON.stringify(body), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    patch(path: string, body: Object = {}): Observable<any> {
        return this.httpClient.patch(`${path}`, JSON.stringify(body), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.httpClient.delete(`${path}`, { params })
            .pipe(catchError(this.handleError));
    }

    getFile(path: string, httpParams: HttpParams = new HttpParams()): Observable<HttpResponse<Blob>> {
        return this.httpClient.get(`${path}`, { observe: 'response', responseType: 'blob', params: httpParams });
    }

    getFileUsingPost(path: string, body: Object = {}, httpParams: HttpParams = new HttpParams()): Observable<HttpResponse<Blob>> {
        return this.httpClient.post(`${path}`, body, { observe: 'response', responseType: 'blob', params: httpParams });
    }

    private handleError = (error: any) => {
        return throwError(error.error);
    }
}
