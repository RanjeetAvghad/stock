import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TimeagoModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
