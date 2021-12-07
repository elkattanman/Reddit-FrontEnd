import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import {LoginComponent} from "./components/auth/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {CreatePostComponent} from "./components/post/create-post/create-post.component";
import {CreateSubredditComponent} from "./components/subreddit/create-subreddit/create-subreddit.component";
import {ListSubredditsComponent} from "./components/subreddit/list-subreddits/list-subreddits.component";
import {ViewPostComponent} from "./components/post/view-post/view-post.component";
import {UserPofileComponent} from "./components/auth/user-pofile/user-pofile.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'create-subreddit', component: CreateSubredditComponent },
  { path: 'list-subreddits', component: ListSubredditsComponent },
  { path: 'user-profile/:name', component: UserPofileComponent },
  { path: 'view-post/:id', component: ViewPostComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
