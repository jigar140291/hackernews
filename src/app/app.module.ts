import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NewsModule } from './news/news.module';

@NgModule({
  imports: [BrowserModule, FormsModule, NewsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
