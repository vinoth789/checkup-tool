// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiUrl: '/api',
  //apiUrl: 'http://localhost:1400',
  keycloakApiUrl: 'http://localhost:8080/auth/admin/realms/CheckUp',
  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://localhost:8080/auth',
    // Realm
    realm: 'CheckUp',
    // The SPA's id. 
    // The SPA is registerd with this id at the auth-serverß
    clientId: 'CheckUpApp',
  },
  maturityClientName: 'check-up',
  realmClientName: 'realm-management',
  realmRoleName: 'realm-admin',
  availableRolesForAdmin: [
    'Consultant',
    'User'
  ],
  availableRolesForConsultant: [
    'User'
  ]  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
