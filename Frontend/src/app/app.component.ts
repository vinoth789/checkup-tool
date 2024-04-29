import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './_services';
import { UserProfile } from './_models/userProfile';
import { KeyCloakUser } from './_models/keyCloakUser';
import { Location } from '@angular/common';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit{
    user: KeyCloakUser;
    username: string;
    role: string;
    specialPage: boolean;

    constructor(private accountService: AccountService, private keycloakService: KeycloakService, private location: Location) {}

    logout() {
        //this.accountService.logout();
        this.keycloakService.logout();
    }
    ngOnInit(): void {
      this.username = localStorage.getItem('username');
      this.role = localStorage.getItem('role');
    }
  
    goBack(): void {
      this.location.back();
    }
}