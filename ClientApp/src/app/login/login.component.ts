import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private userService: UserService,
        private jwtHelper: JwtHelperService,
        private router: Router
    ) { }

    ngOnInit() {
        this.isUserAuthenticated();
    }

    onSubmit() {
        var user = new User();
        user.username = this.userService.loginFormControls.username.value;
        user.password = this.userService.loginFormControls.password.value;
        this.userService.login(user);
    }

    isUserAuthenticated() {
        let token: string = localStorage.getItem("jwt");
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            this.router.navigate(['/products']);
        }
        else {
            return false;
        }
    }
}
