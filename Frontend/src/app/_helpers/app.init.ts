import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';
 
export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return () =>
      keycloak.init({
        config: {
          url: environment.keycloak.issuer,
          realm: environment.keycloak.realm,
          clientId: environment.keycloak.clientId
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            window.location.origin + '/assets/silent-check-sso.html'
        },
        loadUserProfileAtStartUp:true
      });
}