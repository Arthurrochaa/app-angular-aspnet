import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export function tokenGetter() {
    return localStorage.getItem("jwt");
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private base_url = "https://localhost:5001/login/";
    invalidLogin: boolean;
    private loggedIn = new BehaviorSubject<boolean>(false);

    get isLoggedIn(){
        let token = tokenGetter();
        if(token && !this.jwtHelper.isTokenExpired(token)){
            this.loggedIn.next(true)
        }
        return this.loggedIn.asObservable()
    }

    constructor(
        private httpClient: HttpClient,
        private formBuilder: FormBuilder,
        private router: Router,
        private jwtHelper: JwtHelperService
    ) { }


    loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    })

    get loginFormControls() { return this.loginForm.controls; }

    login(user: User) {
        this.httpClient.post(this.base_url, user).subscribe(
            response => {
                let token = (<any>response).accessToken;
                localStorage.setItem("jwt", token);
                this.invalidLogin = false;
                this.loggedIn.next(true)
                this.router.navigate(["/products"]);
            },
            err => {
                this.invalidLogin = true;
            }
        );
    }

    logOut() {
        localStorage.removeItem("jwt");
        this.loggedIn.next(false)
        this.router.navigate(["/"])
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.');
    };
}
