import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsService } from './news.service';
import { HttpClientModule } from '@angular/common/http';
import { PostNewsComponent } from './post-news/post-news.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewsComponent, PostNewsComponent],
  imports: [
    HttpClientModule, 
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [NewsComponent],
  providers: [NewsService]
})
export class NewsModule { }
