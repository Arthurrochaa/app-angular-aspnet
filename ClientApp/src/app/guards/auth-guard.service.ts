import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService, tokenGetter } from '../services/user.service';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private jwtHelper: JwtHelperService,
        private router: Router,
        private userService: UserService
    ) { }

    canActivate() {
        var token = tokenGetter();
        return this.userService.isLoggedIn
            .pipe(
                take(1),
                map((isLoggedIn: boolean) => {
                    if (!isLoggedIn && !token && this.jwtHelper.isTokenExpired(token)) {
                        this.router.navigate(['/']);
                        return false;
                    }
                    return true;
                }))
    }
}
