import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { UserProfile } from '@app/_models/userProfile';
import { KeyCloakUser } from '@app/_models/keyCloakUser';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AccountService {
    public userSubject: BehaviorSubject<KeyCloakUser>;
    public user: Observable<KeyCloakUser>;
    public userRole: any;
    public userDetailsList: KeyCloakUser[] = [];
    public token: string = localStorage.getItem('token');
    public refreshToken: string = localStorage.getItem('refreshToken');
    public clientId: string = localStorage.getItem('clientId');
    keycloakService: KeycloakService;
    public maturityClientName: string = "maturity-evaluation";
    public realmClientName: string = "realm-management";
    public realmRoleName: string = "realm-admin";
    public addUserConst: string = "add";
    public editUserConst: string = "edit";
    public httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
        })
    }

    constructor(
        private router: Router,
        private http: HttpClient,
        _keycloakService: KeycloakService
    ) {
        this.keycloakService = _keycloakService;
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): KeyCloakUser {
        return this.userSubject.value;
    }

    public async ngOnInit() {
        //this.clientId = localStorage.getItem('clientId');
    }

    login(username, password) {
        return this.http.post<KeyCloakUser>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    async logout() {
        // let clientId: any = await this.getClientId(environment.maturityClientName);
        // var logoutUserUrl = `${environment.keycloakApiUrl}/protocol/openid-connect/logout`;
        // let userParams = {"client_id":clientId,"client_secret":localStorage.getItem('clientSecret'),"refresh_token":localStorage.getItem('refreshToken')};
        //     this.http.post(logoutUserUrl, userParams, { headers:{"Content-Type": "application/x-www-form-urlencoded"} }).toPromise();
        this.keycloakService.logout().then(() => this.keycloakService.clearToken());
    }

    async register(user: UserProfile) {

        var registerUsersUrl = `${environment.keycloakApiUrl}/users`;
        let userParams = { "enabled": true, "attributes": {}, "emailVerified": true, "username": user.username, "email": user.email, "firstName": user.firstName, "lastName": user.lastName };
        await this.http.post<KeyCloakUser>(registerUsersUrl, userParams, this.httpOptions).toPromise();

        let data: any = await this.getUserByUsername(user.username);
        let response: any = JSON.stringify(data);
        var userProfile = JSON.parse(response);
        await this.resetUserPassword(userProfile[0].id, user.password);
        await this.addClientRoleToUser(userProfile[0].id, user.role, environment.maturityClientName, this.addUserConst);
        await this.addClientRoleToUser(userProfile[0].id, environment.realmRoleName, environment.realmClientName, this.addUserConst);

    }
    async getUserByUsername(username: string) {
        var getUserByUsernameUrl = `${environment.keycloakApiUrl}/users?username=${username}`;
        return await this.http.get(getUserByUsernameUrl, this.httpOptions).toPromise();
    }
    async resetUserPassword(userid: any, newPassword: any) {
        let passwordResetParams = { "type": "password", "value": newPassword, "temporary": false }
        var resetUserPasswordUrl = `${environment.keycloakApiUrl}/users/${userid}/reset-password`;
        return await this.http.put<KeyCloakUser>(resetUserPasswordUrl, passwordResetParams, this.httpOptions).toPromise();
    }
    async addClientRoleToUser(userid: any, roleName: any, clientName: any, addOrUpdate: any) {
        let clientId: any = await this.getClientId(clientName);
        let getClientAssignedRolesUrl = `${environment.keycloakApiUrl}/clients/${clientId}/roles`;
        let clientRoles: any = await this.http.get(getClientAssignedRolesUrl, this.httpOptions).toPromise();
        let clientRoleList: any = JSON.stringify(clientRoles);
        let clientRoleListObj: any = JSON.parse(clientRoleList)
        console.log(clientRoleListObj);
        let clientRoleId: any;
        let role: any;
        clientRoleListObj.forEach(role => {
            if (role.name == roleName) {
                clientRoleId = role.id;
                console.log("role name " + roleName);
                //role = roleName;
            }
        })

        let addUserRoleParams = [{ "id": clientRoleId, "name": roleName }];
        var addRoleToUserUrl = `${environment.keycloakApiUrl}/users/${userid}/role-mappings/clients/${clientId}`;
        if (addOrUpdate == this.addUserConst) {
            return await this.http.post(addRoleToUserUrl, addUserRoleParams, this.httpOptions).toPromise();
        } else {
            await this.http.delete(addRoleToUserUrl, this.httpOptions).toPromise();
            return await this.http.post(addRoleToUserUrl, addUserRoleParams, this.httpOptions).toPromise();
        }

    }

    async getClientId(appClientId: any) {
        let clientName: any;
        if (appClientId == "realm-management") {
            clientName = appClientId;
        } else {
            clientName = localStorage.getItem('clientId');
        }
        
        let getClientUrl = `${environment.keycloakApiUrl}/clients?clientId=${clientName}`;
        let clients: any = await this.http.get(getClientUrl, this.httpOptions).toPromise();
        let clientList: any = JSON.stringify(clients);
        let clientListObj: any = JSON.parse(clientList)
        let clientId: any = clientListObj[0].id;
        return await clientId;
    }

     async getAllUsers() {
         let clientId: any = await this.getClientId(environment.maturityClientName);
         console.log("clientId", clientId);
         var getUsersUrl = `${environment.keycloakApiUrl}/users?briefRepresentation=true`;
         this.userDetailsList = await this.http.get<KeyCloakUser[]>(getUsersUrl, this.httpOptions).toPromise();
         let userRole: any;
         let userid: number;

         this.userDetailsList.forEach(async element => {
             userid = element.id;
             userRole = await this.getUserRole(userid, clientId);
             if (userRole != undefined) {
                 element.role = userRole[0].name;
             }
         });

         return this.userDetailsList;
     }

    // async getAllUsers() {
    //     try {
    //         const clientId = await this.getClientId(environment.maturityClientName);
    //         console.log("clientId", clientId);
    
    //         const getUsersUrl = `${environment.keycloakApiUrl}/users?briefRepresentation=true`;
    //         const response = await this.http.get<KeyCloakUser[]>(getUsersUrl, this.httpOptions).toPromise();
            
    //         for (const user of response) {
    //             const userRole = await this.getUserRole(user.id, clientId);
    //             if (userRole) {
    //                 user.role = userRole[0].name;
    //             }
    //         }
    
    //         return response;
    //     } catch (error) {
    //         console.error('Error fetching users:', error);
    //         throw error; // Rethrow the error for the caller to handle
    //     }
    // }
    

    async getUserRole(userid: any, clientId: any) {
        var getUserswithRoleUrl = `${environment.keycloakApiUrl}/users/${userid}/role-mappings/clients/${clientId}`;
        return await this.http.get(getUserswithRoleUrl, this.httpOptions).toPromise();
    }

    getUserById(id: any) {
        return this.userDetailsList.find(x => x.id === id);
    }
    async updateUser(userId: string, user: UserProfile) {

        let params: HttpParams;
        var updateUserUrl = `${environment.keycloakApiUrl}/users/${userId}`;
        params = new HttpParams();
        let updateUserParams = { "enabled": true, "attributes": {}, "emailVerified": true, "username": user.username, "email": user.email, "firstName": user.firstName, "lastName": user.lastName };
        await this.http.put<KeyCloakUser>(updateUserUrl, updateUserParams, this.httpOptions).toPromise();
        await this.addClientRoleToUser(userId, user.role, environment.maturityClientName, this.editUserConst);
        if (user.password != "") {
            await this.resetUserPassword(userId, user.password);
        }
    }

    async deleteUser(userId: string) {
        let params: HttpParams;
        var deleteUserUrl = `${environment.keycloakApiUrl}/users/${userId}`;
        params = new HttpParams();
        await this.http.delete(deleteUserUrl, this.httpOptions).toPromise();
    }

}