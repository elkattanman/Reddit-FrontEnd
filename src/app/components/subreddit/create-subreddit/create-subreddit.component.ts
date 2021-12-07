import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {SubredditModel} from "../../../shared/subreddit-model";
import {SubredditService} from "../../../shared/subreddit.service";
import {Router} from "@angular/router";
import {throwError} from "rxjs";

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  createSubredditForm= this.fb.group(
    {
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  subredditModel: SubredditModel;

  constructor(private fb: FormBuilder,private router: Router, private subredditService: SubredditService) {
    this.subredditModel = {
      name: '',
      description: ''
    }
  }

  ngOnInit(): void {
  }

  discard() {
    this.router.navigateByUrl('/');
  }

  createSubreddit() {
    this.subredditModel.name = this.createSubredditForm.controls['title'].value;
    this.subredditModel.description = this.createSubredditForm.controls['description'].value;
    this.subredditService.createSubreddit(this.subredditModel).subscribe(data => {
      this.router.navigateByUrl('/list-subreddits');
    }, error => {
      throwError(error);
    })
  }
}
