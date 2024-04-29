import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatListOption } from '@angular/material/list'
import { CompanyService, AccountService, DepartmentService, AlertService } from '@app/_services';
import { Department, User, Company } from '@app/_models';
import { ModalContainerComponent } from 'angular-bootstrap-md';
import { KeyCloakUser } from '@app/_models/keyCloakUser';
declare var $: any;

@Component({
    templateUrl: 'add-edit.component.html',
    styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
    form: FormGroup;
    addDepartmentForm: FormGroup;
    id: number;
    role: string;
    username: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    submittedDepartment = false;
    companies: any;
    noOfCompanies: any;
    usersInvolved: KeyCloakUser[] = [];
    departments: any;
    selected: string;
    selectedOptions: string[] = [''];
    newDepartmentValue: string;
    selectedDepartments: MatListOption[] = [];
    selectedCompanySpecificDepartments: MatListOption[] = [];
    selectedUsers: MatListOption[] = [];
    addNewDepartmentList: Department[] = [];
    addDepartmentList: Department[] = [];
    addUserList: KeyCloakUser[] = [];
    addNewCompany: Company;
    noOfDepartmentsAdded = 0;
    departmentListJson: any;
    @ViewChild('departmentModal', { static: true }) departmentModal: ModalContainerComponent;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private companyService: CompanyService,
        private departmentService: DepartmentService,
        private alertService: AlertService,
        private accountService: AccountService
    ) { }

    async ngOnInit() {
        this.role = localStorage.getItem('role');
        this.username = localStorage.getItem('username');
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
            companyName: ['', Validators.required],
            departments: ['', Validators.required],
            usersInvolved: ['', Validators.required],
            latitude: [''],
            longitude: [''],
            numberOfEmployees: [''],
            typeOfCompany: [''],
            originOfCompany: [''],
        });

        this.addDepartmentForm = this.formBuilder.group({
            newDepartment: ['']
        });

        this.usersInvolved = await this.accountService.getAllUsers();
        this.companyService.getAllDepartments()
            .pipe(first())
            .subscribe(departments => {
                this.departments = departments;
                this.form.controls.departments.patchValue(this.departments[0].id)
            });

        this.companyService.getAllCompanies()
            .pipe(first())
            .subscribe(companies => { this.companies = companies });

        let departmentModalClosebtn = document.getElementById("modalCloseButton");
        departmentModalClosebtn.addEventListener("click", (e: Event) => this.clearFileds());
        let departmentModalOpenbtn = document.getElementById("addDepartmentBtn");
        departmentModalOpenbtn.addEventListener("click", (e: Event) => this.clearFileds());

    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    get g() { return this.addDepartmentForm.controls; }

    onSubmit() {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        this.clearFileds();
        let companyName = this.form.controls['companyName'].value;
        let numberOfEmployees = this.form.controls['numberOfEmployees'].value;
        if (numberOfEmployees == "")
            numberOfEmployees = 0;
        let typeOfCompany = this.form.controls['typeOfCompany'].value;
        let originOfCompany = this.form.controls['originOfCompany'].value;
        let latitude = this.form.controls['latitude'].value;
        let longitude = this.form.controls['longitude'].value;
        if (this.selectedDepartments.length == 0 && this.selectedCompanySpecificDepartments.length == 0) {
            document.getElementById("departmentListError").innerHTML = "Please select the departments";
            setTimeout(function () {
                document.getElementById("departmentListError").innerHTML = "";
            }, 2000);
            return;
        } else if (this.selectedUsers.length == 0) {
            document.getElementById("userListError").innerHTML = "Please select atleast one user";
            setTimeout(function () {
                document.getElementById("userListError").innerHTML = "";
            }, 2000);
            return;
        }

        this.usersInvolved.filter(o1 => this.selectedUsers.some(o2 => o1.id === o2.value)).map(o => { this.addUserList.push(new KeyCloakUser(o.username, o.firstName, o.lastName, o.email, o.role)) });
        this.selectedDepartments.map(o => { this.addDepartmentList.push(new Department(o.value)) });
        this.selectedCompanySpecificDepartments.map(o => { this.addDepartmentList.push(new Department(o.value)) });
        this.addNewCompany = new Company(companyName, parseInt(numberOfEmployees), typeOfCompany, originOfCompany, latitude, longitude, this.addDepartmentList, this.addUserList);
        console.log(this.addDepartmentList.map(o => o.id));
        console.log(this.addUserList.map(o => o.id));
        console.log(this.addNewCompany);

        this.loading = true;
        if (this.isAddMode) {
            this.createCompany(this.addNewCompany);
        } else {
            this.updateCompany();
        }
    }

    addSelectedItems(selectedItems: MatListOption[], category: string) {
        if (category == "defaultDepartment") {
            this.selectedDepartments = selectedItems;
        } else if (category == "newlyAddedDepartment") {
            this.selectedCompanySpecificDepartments = selectedItems;
        } else if (category == "selectedUsers") {
            this.selectedUsers = selectedItems;
        }
    }

    addSelectedUsers(selectedUsers: MatListOption[]) {
        this.selectedUsers = selectedUsers;
    }

    private createCompany(addNewCompany: Company) {

        this.companyService.registerNewCompany(addNewCompany)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Company added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateCompany() {
        this.companyService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    onNgModelChange(event) {
        console.log('on ng model change', event);
    }

    addDepartmentToList() {

        let newDepartment = this.addDepartmentForm.controls['newDepartment'].value;
        if (newDepartment == null || newDepartment == "") {
            document.getElementById("departmentEmpty").innerHTML = "Please enter the department";
            setTimeout(function () {
                document.getElementById("departmentEmpty").innerHTML = "";
            }, 2000);
            return;
        }
        this.addNewDepartmentList.push(new Department(newDepartment));
        this.noOfDepartmentsAdded = this.addNewDepartmentList.length;
        this.addDepartmentForm.get('newDepartment').reset();
    }

    removeDepartmentFromList(department: number) {
        this.addNewDepartmentList.splice(department, 1);
    }

    clearFileds() {
        this.addDepartmentForm.get('newDepartment').reset();
        this.addNewDepartmentList = [];
        this.noOfDepartmentsAdded = 0;
    }

    submitAddDepartmentForm() {

        this.submittedDepartment = true;
        if (this.addNewDepartmentList.length == 0) {
            document.getElementById("departmentListEmpty").innerHTML = "Please add departments to the list";
            setTimeout(function () {
                document.getElementById("departmentListEmpty").innerHTML = "";
            }, 2000);
            return;
        }
        document.getElementById("newDepartmentsDiv").style.display = "block";
        $('#addDepartmentModal').modal('hide');
    }

    private createDepartment(addDepartmentList: Department[]) {
        this.departmentService.register(addDepartmentList)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Department added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateDepartment() {
        this.departmentService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}