import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxPaginateModule } from './ngx-paginate.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
