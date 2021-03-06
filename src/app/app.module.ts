// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// components
import { AppComponent } from './app.component';

// service for pastebin
import { PastebinService } from './pastebin.service';

// modules used in tutorial
import { HttpModule } from '@angular/http';

// in memory web api to sim http server
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../in-memory-data.service';
import { PastebinComponent } from './pastebin-component/pastebin.component';

@NgModule({
  declarations: [
    AppComponent,
    PastebinComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  providers: [PastebinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
