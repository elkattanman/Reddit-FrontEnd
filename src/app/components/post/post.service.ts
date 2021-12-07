import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostModel} from "./post-model";
import {Observable} from "rxjs";
import {CreatePostPayload} from "./create-post-payload";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(this.baseUrl + 'api/v2/posts/');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post(this.baseUrl + 'api/v2/posts/', postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(this.baseUrl + `api/v2/posts/${id}`);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.baseUrl + `api/v2/users/${name}/posts`);
  }
}
