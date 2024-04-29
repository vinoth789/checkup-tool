import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SurveyRoutingModule } from './survey-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { SurveyLayoutComponent } from './surveyLayout.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { StatsCardComponent } from './common/stats-card/stats-card.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MDBBootstrapModule.forRoot(),
        SurveyRoutingModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        StatsCardComponent,
        SurveyLayoutComponent,
    ]
})
export class SurveyModule { }