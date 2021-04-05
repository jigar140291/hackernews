import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-news',
  templateUrl: './post-news.component.html',
  styleUrls: ['./post-news.component.scss']
})
export class PostNewsComponent {

  constructor(private userService: UserService, private newsService: NewsService, private router: Router) { }

  public postStory(form: NgForm){
    let story = {...form.value, username: this.userService.userState?.username, id: Math.random()};
    this.newsService.postStory(story)
    .then(() => {
      if (window.confirm("Story Added Successfully, Moving to Latest Stories...")) this.router.navigateByUrl('/new-stories');
    })
    .catch((err) => alert(`${err.message}, Please Retry`))
  }
}
