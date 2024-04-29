import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Company } from '@app/_models';
import { Department } from '@app/_models/department';


@Injectable({ providedIn: 'root' })
export class CompanyService {
    private companySubject: BehaviorSubject<Company>;
    public company: Observable<Company>;
    public httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${environment.apiUrl}`,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
        }),
        withCredentials: true
        }  

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.companySubject = new BehaviorSubject<Company>(JSON.parse(localStorage.getItem('company')));
        this.company = this.companySubject.asObservable();
    }
    
    register(company: Company) {
        return this.http.post(`${environment.apiUrl}/company/register`, company);
    }
    registerNewCompany(company: Company) {
        return this.http.post(`${environment.apiUrl}/companies/register`, company , { headers:{ "Authorization": "Bearer " + localStorage.getItem('token')} });
    }
    getAllCompanies() {
        return this.http.get<Company[]>(`${environment.apiUrl}/companies`, { headers:{ "Authorization": "Bearer " + localStorage.getItem('token')} });
    }
    getAllDepartments() {
        return this.http.get<Department[]>(`${environment.apiUrl}/departments/defaultDepartments`, { headers:{ "Authorization": "Bearer " + localStorage.getItem('token')} });
    }
    getCompanyById(id: number) {
        return this.http.get<Company>(`${environment.apiUrl}/companies/${id}`, { headers:{ "Authorization": "Bearer " + localStorage.getItem('token')} });
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/companies/${id}`, params, { headers:{ "Authorization": "Bearer " + localStorage.getItem('token')} })
            .pipe(map(x => {
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/companies/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}
