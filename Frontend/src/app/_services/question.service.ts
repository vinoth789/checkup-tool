import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { FieldOfAction, Question } from '@app/_models';


@Injectable({ providedIn: 'root' })
export class QuestionService {
    private questionSubject: BehaviorSubject<Question>;
    public question: Observable<Question>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.questionSubject = new BehaviorSubject<Question>(JSON.parse(localStorage.getItem('survey')));
        this.question = this.questionSubject.asObservable();
    }

    async getAll() {
        return await this.http.get<Question[]>(`${environment.apiUrl}/questions`).toPromise();
    }
    async getAllFieldOfActions() {
        return await this.http.get<FieldOfAction[]>(`${environment.apiUrl}/questions/fieldOfActions`).toPromise();
    }

    getById(id: string) {
        return this.http.get<Question>(`${environment.apiUrl}/questions/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/questions/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

}
