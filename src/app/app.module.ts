import { NgModule } from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MdButtonModule, MdInputModule, MdCardModule, MdSidenavModule} from '@angular/material';

import {AppComponent} from './app.component';
import {TickerComponent} from './ticker/ticker.component';
import { EsppComponent } from './espp/espp.component';
import { PersonalComponent } from './personal/personal.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    TickerComponent,
    EsppComponent,
    PersonalComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdCardModule,
    MdButtonModule,
    MdSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
