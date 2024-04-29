import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AccountService } from '../../_services';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakRoles } from 'keycloak-js';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: ElementRef;

  clicked: boolean;
  username: string;
  role: string;
  keycloakService: KeycloakService;
  isLoggedIn: boolean;
  userProfile: KeycloakProfile | null = null;
  userRole: string;

  constructor(private accountService: AccountService, _keycloakService: KeycloakService) {
    this.clicked = this.clicked === undefined ? false : true;
    this.keycloakService = _keycloakService;
  }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloakService.loadUserProfile();
      let obj = this.keycloakService.getKeycloakInstance().resourceAccess;
      this.userRole = obj.CheckUpApp.roles[0];
      let clientId = this.keycloakService.getKeycloakInstance().clientId;
      localStorage.setItem('clientId', clientId);
      localStorage.setItem('role', this.userRole);
    }
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }

  async logout(): Promise<void> {
    //this.keycloakService.logout().then(() => this.keycloakService.clearToken());
    //this.keycloakService.clearToken();
    //this.keycloakService.logout();
    await this.accountService.logout();
  }
}
