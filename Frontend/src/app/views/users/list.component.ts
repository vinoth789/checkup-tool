import { Component, OnInit } from '@angular/core';
import { AccountService, AlertService } from '@app/_services';
import { KeyCloakUser } from '@app/_models/keyCloakUser';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users : KeyCloakUser[];
	isTokenCardVisible: boolean = false;
	isAPICardsVisible: boolean = false;

	username: string;
	fullName: string;
	userRole: string;
	usersArray = [];

    constructor(private accountService: AccountService, private alertService: AlertService) {}

    async ngOnInit() {
		this.users = await this.accountService.getAllUsers();
		this.userRole = localStorage.getItem('role');
    }

    reset(): void {
		this.isTokenCardVisible = false;
		this.isAPICardsVisible = false;
		this.usersArray = [];
	}
	deleteUser(userId: string) {
        this.accountService.deleteUser(userId)
		.then(async x => {
			this.users = await this.accountService.getAllUsers();
            this.alertService.success('Delete successful', { keepAfterRouteChange: true });
        });
    }
}