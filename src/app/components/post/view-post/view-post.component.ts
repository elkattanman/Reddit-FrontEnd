import { Component, OnInit } from '@angular/core';
import {PostModel} from "../post-model";
import {PostService} from "../post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentPayload} from "../comment/comment-payload";
import {throwError} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {CommentService} from "../comment/comment.service";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post!: PostModel;
  commentForm=this.fb.group({
    text: ['', Validators.required]
  });
  commentPayload: CommentPayload;
  comments!: CommentPayload[];

  constructor(private fb: FormBuilder, private postService: PostService, private activateRoute: ActivatedRoute,
              private commentService: CommentService, private router: Router) {
    this.postId = this.activateRoute.snapshot.params.id;

    this.commentPayload = {
      text: '',
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  postComment() {
    this.commentPayload.text = this.commentForm.controls['text'].value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.controls['text'].setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }


}
