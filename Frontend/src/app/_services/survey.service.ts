import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Survey, SurveyDetail } from '@app/_models';


@Injectable({ providedIn: 'root' })
export class SurveyService {
    private surveySubject: BehaviorSubject<Survey>;
    public survey: Observable<Survey>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.surveySubject = new BehaviorSubject<Survey>(JSON.parse(localStorage.getItem('survey')));
        this.survey = this.surveySubject.asObservable();
    }

    async registerNewSurvey(survey: Survey) {
        return await this.http.post(`${environment.apiUrl}/surveys/register`, survey , { headers:{ "Authorization": "Bearer " + localStorage.getItem('token')} }).toPromise();
    }
    submitSurveyAnswer(surveyDetails: SurveyDetail) {
        return this.http.post(`${environment.apiUrl}/surveys/registerAnswers`, surveyDetails , { headers:{ "Authorization": "Bearer " + localStorage.getItem('token')} });
    }
    
    updateSurveyAnswer(id, params) {
        return this.http.put(`${environment.apiUrl}/surveys/updateAnswer/${id}`, params);
    }

    async getAllSurveys() {
        return await this.http.get<Survey[]>(`${environment.apiUrl}/surveys`).toPromise();
    }
    
    async getSurveyDetails(){
        return await this.http.get<SurveyDetail[]>(`${environment.apiUrl}/surveys/surveyDetails`).toPromise();
    }

    getById(id: string) {
        return this.http.get<Survey>(`${environment.apiUrl}/survey/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/survey/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }
}
