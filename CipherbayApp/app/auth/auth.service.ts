import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map, Observable } from 'rxjs';

import { ApiService, PromptService } from '../shared';

@Injectable(
    {
    providedIn: 'root',
}
)
export class AuthService {
    BASE_URL: string = 'https://cipherbay-api.vercel.app';
    BASE_API_URL: string = `${this.BASE_URL}/api/v1/`;
    // BASE_URL: string = 'http://localhost:5000/api/v1/';
    // API_KEY: string = 'nRwgKaP8GVzSybkzriiTCxRuQaRJ59kj';
    constructor(private apiService: ApiService, public router: Router, private promptService: PromptService) {
    }

    userLogin(loginCreds): Observable<any> {
        return this.apiService.post(`${this.BASE_API_URL}/auth/login`, loginCreds).pipe(map(data => data));
    }

    userLogout() {
        let removeToken = localStorage.removeItem('access_token');
        if (removeToken == null) {
            // this.router.navigate(['log-in']); [todo]
            this.promptService.info('Logged out successfully');
        }
    }

    userRegister(userDetails): Observable<any> {
        return this.apiService.post(`${this.BASE_API_URL}/auth/register`, userDetails).pipe(map(data => data));
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    get isLoggedIn(): boolean {
        let authToken = localStorage.getItem('access_token');
        return authToken !== null ? true : false;
    }
 
    // User profile
    getUserStatus(): Observable<any> {
        return this.apiService.get(`${this.BASE_URL}/user-profile`).pipe(map((data) => data || {}));
    }
}
