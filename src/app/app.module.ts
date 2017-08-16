import { NgModule } from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {MdInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {TickerComponent} from './ticker/ticker.component';

@NgModule({
  declarations: [
    AppComponent,
    TickerComponent
  ],
  imports: [
    BrowserModule,
    MdInputModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
