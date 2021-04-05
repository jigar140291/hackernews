import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { INews, IPageination, IStory } from './news.interface';
import * as moment from 'moment';

@Injectable()
export class NewsService {
  private apiUrl: string = 'http://hacker-news.firebaseio.com/v0';

  public pages: Array<number> = [];
  public stories: Array<number> = [];
  public top: number = 0;
  public skip: number = 0;
  private limit: number = 25;
  private prevStoryType: string = "";

  constructor(private httpClient: HttpClient) { }

  private getStories = (type: IStory["type"]) => this.httpClient.get(`${this.apiUrl}/${type}stories.json`)

  private getStory = (id: number) => {
    return new Promise(resolve => {
      this.httpClient.get(`${this.apiUrl}/item/${id}.json`).subscribe((story: INews) => {
        story = {
          ...story,
          domain: story?.url ? this.calculateDomainUrl(story.url) : "",
          timesAgo: moment(story.time*1000).fromNow()
        }
        resolve(story);
      })
    })
  }

  public getNewsData = async (pageNumber: number, type: IStory["type"]): Promise<Array<INews>> => {
    if (!this.stories.length || this.prevStoryType != type) {
      this.stories = <Array<number>>await this.getStories(type).pipe().toPromise();
      let pageCount = Math.ceil(this.stories.length / this.limit);
      this.pages = this.getPages(pageCount);
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
    for (let i = skip; i < top; i++) {
      Promises.push(this.getStory(this.stories[i]));
    }
    return await Promise.all(Promises);;
  }

  private calculateDomainUrl(url: string): string {
    const newUrl = new URL(url);
    return newUrl.host.replace('www.', '');
  }

  private getPages(pageCount: number): Array<number> {
    let pages = [];
    for (let i = 1; i <= pageCount; i++) pages.push(i);
    return pages;
  }
}
