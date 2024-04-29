import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './main-layout/navigation/navigation.component';
import { Dashboard1Component } from './views/dashboards/dashboard1/dashboard1.component';
import { SurveyResultComponent } from './views/surveyResults/surveyResult.component';
import { AuthGuard } from './_helpers';

const usersModule = () => import('./views/users/users.module').then(x => x.UsersModule);
const companyModule = () => import('./views/company/company.module').then(x => x.CompanyModule);
const surveyModule = () => import('./views/survey/survey.module').then(x => x.SurveyModule);

const routes: Routes = [
    //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'dashboard', canActivate: [AuthGuard], component: Dashboard1Component },
    //{ path: 'dashboard', loadChildren: dashboardModule, canActivate: [AuthGuard] },
    { path: 'users', canActivate: [AuthGuard], loadChildren: usersModule },
    { path: 'company', canActivate: [AuthGuard], loadChildren: companyModule },
    { path: 'survey', canActivate: [AuthGuard], loadChildren: surveyModule },
    { path: 'surveyResults', canActivate: [AuthGuard], component: SurveyResultComponent },
    //{ path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }