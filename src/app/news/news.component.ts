import { Component } from '@angular/core';
import { NewsService } from './news.service';
import { INews } from './news.interface';

@Component({
  selector: 'news-list',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  public isLoading: boolean = false;
  public news: Array<INews> = [];

  constructor(public newsService: NewsService) { 
    this.loadNews(1);
  }

  public loadNews(pageNumber: number){
    this.isLoading = true;
    this.newsService.getNewsData(pageNumber, "new")
    .then(res => {
      this.isLoading = false;
      this.news = res;
    })
    .catch(err => {
      this.news = [];
      console.log(`Error Occured while fetching data: ${err}`);
    })
  }
}
