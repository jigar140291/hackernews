import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { INews, IPageination, IStory } from './news.interface';

@Injectable()
export class NewsService {
  private apiUrl: string = 'http://hacker-news.firebaseio.com/v0';

  private pageCount: number = 0;
  private stories: Array<number> = [];
  
  private top: number = 0;
  private skip: number = 0;
  private limit: number = 25;

  constructor(private httpClient: HttpClient) { }

  private getStories = (type: IStory["type"]) => this.httpClient.get(`${this.apiUrl}/${type}stories.json`)

  private getStory = (id: number) => this.httpClient.get(`${this.apiUrl}/item/${id}.json`)

  public getNewsData = async (pageNumber: number, type: IStory["type"]): Promise<Array<INews>> => {
    if (!this.stories.length) {
      this.stories = <Array<number>> await this.getStories(type).pipe().toPromise();
      this.pageCount = Math.ceil(this.stories.length / this.limit);
    }

    let { top, skip } = this.calculatePageParams(pageNumber);
    return this.fetchData(top, skip);
  }

  private calculatePageParams(pageNumber: number): IPageination {
    this.skip = this.limit * (pageNumber - 1);
    this.top = pageNumber * this.limit;

    return { top: this.top, skip: this.skip };
  }

  private async fetchData(top, skip): Promise<Array<INews>> {
    let Promises = [];
    for (let i=skip; i < top; i++) {
      Promises.push(this.getStory(this.stories[i]).pipe().toPromise());
    }
    return await Promise.all(Promises);;
  }
}
