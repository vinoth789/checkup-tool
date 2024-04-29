import { Department } from './department';
import { KeyCloakUser } from './keyCloakUser';

export class Company {
    id: number;
    companyName: string;
    numberOfEmployees: number;
    typeOfCompany: string;
    originOfCompany: string;
    latitude: string;
    longitude: string;
    departments: Department[] = [];
    users: KeyCloakUser[] = [];

    constructor(companyName: string, numberOfEmployees: number, typeOfCompany: string, originOfCompany: string, latitude: string, longitude: string, departments: Department[], users: KeyCloakUser[]) {
        this.companyName = companyName;
        this.numberOfEmployees = numberOfEmployees
        this.typeOfCompany = typeOfCompany
        this.originOfCompany = originOfCompany;
        this.latitude = latitude;
        this.longitude = longitude;
        this.departments = departments;
        this.users = users;
    }
}