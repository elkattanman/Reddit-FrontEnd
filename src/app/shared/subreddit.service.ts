import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SubredditModel} from "./subreddit-model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>(this.baseUrl+'api/v2/subreddits');
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.http.post<SubredditModel>(this.baseUrl+'api/v2/subreddits',
      subredditModel);
  }}
