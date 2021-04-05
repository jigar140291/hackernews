import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NewsModule } from './news/news.module';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, NewsModule, UserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
