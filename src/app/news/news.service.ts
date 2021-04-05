import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { INews, IPageination, IStory } from './news.interface';

@Injectable()
export class NewsService {
  private apiUrl: string = 'http://hacker-news.firebaseio.com/v0';

  public pages: Array<number> = [];
  public stories: Array<number> = [];
  public top: number = 0;
  public skip: number = 0;
  private limit: number = 25;

  constructor(private httpClient: HttpClient) { }

  private getStories = (type: IStory["type"]) => this.httpClient.get(`${this.apiUrl}/${type}stories.json`)

  private getStory = (id: number) => {
    return new Promise(resolve => {
      this.httpClient.get(`${this.apiUrl}/item/${id}.json`).subscribe((story: INews) => {
        story = {
          ...story,
          domain: story?.url ? this.calculateDomainUrl(story.url) : "",
          timesAgo: this.calculateTimeFormat(story.time)
        }
        resolve(story);
      })
    })
  }

  public getNewsData = async (pageNumber: number, type: IStory["type"]): Promise<Array<INews>> => {
    if (!this.stories.length) {
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

  private calculateTimeFormat(timeInUnix: number): string {
    let timeDiff = <any>new Date - <any>new Date(timeInUnix * 1000);
    let { days, hours, minutes, seconds } = this.parseDuration(timeDiff);

    return days ? `${days} days` :
      hours ? `${hours} hours` :
        minutes ? `${minutes} minutes` :
          `${seconds} seconds`;
  }

  private parseDuration(duration) {
    let remain = duration

    let days = Math.floor(remain / (1000 * 60 * 60 * 24))
    remain = remain % (1000 * 60 * 60 * 24)

    let hours = Math.floor(remain / (1000 * 60 * 60))
    remain = remain % (1000 * 60 * 60)

    let minutes = Math.floor(remain / (1000 * 60))
    remain = remain % (1000 * 60)

    let seconds = Math.floor(remain / (1000))
    remain = remain % (1000)

    return {
      days,
      hours,
      minutes,
      seconds
    };
  }

  private getPages(pageCount: number): Array<number> {
    let pages = [];
    for (let i = 1; i <= pageCount; i++) pages.push(i);
    return pages;
  }
}
