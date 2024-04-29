import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { AccountService } from '@app/_services';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProfile } from '@app/_models/userProfile';

@Injectable({ providedIn: 'root' })

export class AuthGuard extends KeycloakAuthGuard {
  public userSubject: BehaviorSubject<UserProfile>;
  public user: UserProfile;
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService,
    private accountService: AccountService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }
    await this.keycloak.loadUserProfile();
    let userProfile: any;
    userProfile = this.keycloak.getKeycloakInstance().profile;
    localStorage.setItem('user', JSON.stringify((this.keycloak.loadUserProfile())));
    await this.keycloak.getUsername();
    localStorage.setItem('username', this.keycloak.getUsername());
    await this.keycloak.getUserRoles();
    let obj = this.keycloak.getKeycloakInstance().resourceAccess;
    let token = this.keycloak.getKeycloakInstance().token;
    let refreshToken = this.keycloak.getKeycloakInstance().refreshToken;
    let clientId = this.keycloak.getKeycloakInstance().clientId;
    let clientSecret = this.keycloak.getKeycloakInstance().clientSecret;
    let role = obj.CheckUpApp.roles[0];
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('role', role);
    localStorage.setItem('clientSecret', clientSecret);

    // Get the roles required from the route.
    const requiredRoles = route.data.roles;

    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    return requiredRoles.every((role) => this.roles.includes(role));
  }
}