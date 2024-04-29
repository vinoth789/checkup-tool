import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    roles:any;
    currentRole: any;
    ADMIN_ROLE = 'Admin';
    CONSULTANT_ROLE = 'Consultant';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        this.currentRole = localStorage.getItem('role');
        this.roles = [];
        if(this.currentRole == this.ADMIN_ROLE) {
            this.roles = environment.availableRolesForAdmin;
        }else if(this.currentRole == this.CONSULTANT_ROLE){
            this.roles = environment.availableRolesForConsultant;
        }
        

        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        const emailValidators = [Validators.email];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', emailValidators],
            password: ['', passwordValidators],
            role: ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.form.patchValue(this.accountService.getUserById(this.id));
                //.pipe(first())
                //.(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.accountService.register(this.form.value)
            .then(x => {
                this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                this.router.navigate(['../'], { relativeTo: this.route });
            }).catch((err) => { 
                console.log(err);
                if(err == "Conflict") {
                    this.loading = false;
                    this.alertService.error('User already exists', { keepAfterRouteChange: true });
                    //reject(err); // Here.
                }
            });
    }
    private updateUser() {
        this.accountService.updateUser(this.id, this.form.value)
        .then(x => { 
            this.alertService.success('Update successful', { keepAfterRouteChange: true });
            this.router.navigate(['../../'], { relativeTo: this.route });
        }).catch((err) => { 
            console.log(err);
            if(err == "Conflict") {
                this.loading = false;
                this.alertService.error('User already exists', { keepAfterRouteChange: true });
                //reject(err); // Here.
            }
        });
    }
}