import { AgmCoreModule } from '@agm/core';
import { APP_INITIALIZER, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { JwtInterceptor } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Route } from '@angular/router';

//import { ViewsModule } from './views/views.module';
import { DashboardModule } from './views/dashboards/dashboard1/dashboard.module';
import { UsersModule } from './views/users/users.module';
import { CompanyModule } from './views/company/company.module';
import { SurveyModule } from './views/survey/survey.module';
import { SurveyResultModule } from './views/surveyResults/surveyResult.module';
import { SharedModule } from './shared/shared.module';
import { NavigationModule } from './main-layout/navigation/navigation.module';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IgxBulletGraphModule } from 'igniteui-angular-gauges';
import { initializer } from './_helpers/app.init';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
    imports: [
        AgmCoreModule.forRoot({
            apiKey: ''
          }),
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule,
        BrowserAnimationsModule,
        FormsModule,
        SharedModule,
        DashboardModule,
        UsersModule,
        CompanyModule,
        SurveyModule,
        SurveyResultModule,
        MatCardModule,
        MatRadioModule,
        MatIconModule,
        MatButtonModule,
        IgxBulletGraphModule,
        Ng2SearchPipeModule,
        NavigationModule,
        KeycloakAngularModule
        
    ],
    declarations: [
        AppComponent,
        AlertComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: APP_INITIALIZER,
        useFactory: initializer,
        multi: true,
        deps: [KeycloakService] }
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { };