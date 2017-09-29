import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {TickerComponent} from './ticker/ticker.component';
import { EsppComponent } from './espp/espp.component';
import { PersonalComponent } from './personal/personal.component';
import { InputComponent } from './input/input.component';
import { ContentComponent } from './content/content.component';
import {DerivedValueService} from "./derived-value.service";
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    TickerComponent,
    EsppComponent,
    PersonalComponent,
    InputComponent,
    ContentComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgbTypeaheadModule
  ],
  providers: [DerivedValueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
