import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SubredditService} from "../../../shared/subreddit.service";
import {PostService} from "../post.service";
import {SubredditModel} from "../../../shared/subreddit-model";
import {CreatePostPayload} from "../create-post-payload";
import {throwError} from "rxjs";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm= this.fb.group(
    {
      postName: ['', Validators.required],
      subredditName: ['', Validators.required],
      url: ['', Validators.required],
      description: ['', Validators.required],
    }
  );
  postPayload: CreatePostPayload;
  subreddits?: Array<SubredditModel>;

  constructor(private fb: FormBuilder,private router: Router, private postService: PostService,
              private subredditService: SubredditService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      subredditName: ''
    }
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.controls['postName'].value;
    this.postPayload.subredditName = this.createPostForm.controls['subredditName'].value;
    this.postPayload.url = this.createPostForm.controls['url'].value;
    this.postPayload.description = this.createPostForm.controls['description'].value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe((data) => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    });
  }

}
