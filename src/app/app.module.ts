import { NgModule } from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MdButtonModule, MdInputModule} from '@angular/material';
import {MdCardModule} from '@angular/material';

import {AppComponent} from './app.component';
import {TickerComponent} from './ticker/ticker.component';
import { EsppComponent } from './espp/espp.component';
import { PersonalComponent } from './personal/personal.component';

@NgModule({
  declarations: [
    AppComponent,
    TickerComponent,
    EsppComponent,
    PersonalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdCardModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
