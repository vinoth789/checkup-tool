import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { CompanyRoutingModule } from './company-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MDBBootstrapModule.forRoot(),
        CompanyRoutingModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent
    ]
})
export class CompanyModule { }