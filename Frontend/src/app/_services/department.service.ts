import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Department, Company } from '@app/_models';


@Injectable({ providedIn: 'root' })
export class DepartmentService {
    private departmentSubject: BehaviorSubject<Department>;
    public department: Observable<Department>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.departmentSubject = new BehaviorSubject<Department>(JSON.parse(localStorage.getItem('department')));
        this.department = this.departmentSubject.asObservable();
    }


    register(department: Department[]) {
        alert("heyy"+department);
        return this.http.post(`${environment.apiUrl}/departments/register`, department, {headers: {'Content-Type': 'application/json'}});
    }

    getAll() {
        return this.http.get<Department[]>(`${environment.apiUrl}/departments/defaultDepartments`);
    }

    getById(id: string) {
        return this.http.get<Department>(`${environment.apiUrl}/departments/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/departments/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/departments/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}
