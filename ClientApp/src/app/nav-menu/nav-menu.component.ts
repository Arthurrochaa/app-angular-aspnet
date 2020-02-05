import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService, tokenGetter } from '../services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
    isExpanded = false;
    isLoggedIn$: Observable<boolean>;

    constructor(private jwtHelper: JwtHelperService, private userService: UserService) { }

    ngOnInit(){
        this.isLoggedIn$ = this.userService.isLoggedIn
    }

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    logout() {
        this.userService.logOut()
    }
}
