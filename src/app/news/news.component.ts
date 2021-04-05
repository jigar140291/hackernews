import { Component } from '@angular/core';
import { NewsService } from './news.service';
import { INews, IStory } from './news.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'news-list',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  public isLoading: boolean = false;
  public news: Array<INews> = [];
  public storyMapping = {
    "new-stories":"new",
    "top-stories":"top",
    "best-stories":"best"
  }
  public storyType: IStory["type"];

  constructor(public newsService: NewsService, private activeRoute: ActivatedRoute) {
    this.storyType = this.storyMapping[this.activeRoute.snapshot.url.join('')];
    this.loadNews(1, this.storyType);
  }

  public loadNews(pageNumber: number, storyType: IStory["type"]){
    this.isLoading = true;
    this.newsService.getNewsData(pageNumber, storyType)
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
