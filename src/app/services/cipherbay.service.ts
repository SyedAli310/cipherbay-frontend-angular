import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CipherbayService {
  BASE_URL: string = 'http://cipherbay-dev.herokuapp.com/api/v1/';
  API_KEY: string = 'nRwgKaP8GVzSybkzriiTCxRuQaRJ59kj';
  constructor(private _http: HttpClient) {}

  getSchemes(): any {
    // return fetched schemes
    return this._http.get(`${this.BASE_URL}cipher/schemes`, {
      headers: {
        apiKey: this.API_KEY,
      },
    });
  }

  encode(scheme: string, input: string): any {
    return this._http.post(
      `${this.BASE_URL}cipher/encode`,
      {
        scheme: scheme,
        str: input,
      },
      {
        headers: {
          apiKey: this.API_KEY,
        },
      }
    );
  }

  decode(cipher: string): any {
    return this._http.post(
      `${this.BASE_URL}cipher/decode`,
      {
        code: cipher,
      },
      {
        headers: {
          apiKey: this.API_KEY,
        },
      }
    );
  }
}
