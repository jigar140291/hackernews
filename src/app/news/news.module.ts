import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsService } from './news.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [NewsComponent],
  imports: [HttpClientModule, CommonModule],
  exports: [NewsComponent],
  providers: [NewsService]
})
export class NewsModule { }
