import { Component } from '@angular/core';
import { NewsService } from './news.service';
import { INews } from './news.interface';

@Component({
  selector: 'news-list',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  
  public news: Array<INews> = [];

  constructor(private newsService: NewsService) { 
    this.loadNews(1);
  }

  loadNews(pageNumber: number){
    this.newsService.getNewsData(pageNumber, "new")
    .then(res => this.news = res)
    .catch(err => {
      this.news = [];
      console.log(`Error Occured while fetching data: ${err}`);
    })
  }
}
