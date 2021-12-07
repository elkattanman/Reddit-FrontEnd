import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VotePayload} from "../components/vote-button/vote-payload";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  vote(votePayload: VotePayload): Observable<any> {
    return this.http.post(this.baseUrl + 'api/v2/votes/', votePayload);
  }
}
