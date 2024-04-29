import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { StatsCardComponent } from '../common/stats-card/stats-card.component';
import { Dashboard1Component } from '../dashboard1/dashboard1.component';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared/shared.module';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    //MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    SharedModule,
    LeafletModule,
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: ''
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  declarations: [
    StatsCardComponent,
    Dashboard1Component,
  ],
  exports: [
    StatsCardComponent,   
    Dashboard1Component,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DashboardModule { }
