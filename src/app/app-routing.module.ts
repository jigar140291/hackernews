import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { LoginComponent } from './user/login.component';
import { PostNewsComponent } from './news/post-news/post-news.component';
import { LoginActivateService } from './shared/login-activate.service';

const routes: Routes = [
  { path: '', redirectTo: '/new-stories', pathMatch: 'full' },
  { path: 'new-stories', component: NewsComponent},
  { path: 'top-stories', component: NewsComponent},
  { path: 'best-stories', component: NewsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: LoginComponent},
  { path: 'post-stories', component: PostNewsComponent, canActivate:[LoginActivateService]}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
