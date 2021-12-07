import { Component, OnInit } from '@angular/core';
import {CommentService} from "../../post/comment/comment.service";
import {PostService} from "../../post/post.service";
import {ActivatedRoute} from "@angular/router";
import {CommentPayload} from "../../post/comment/comment-payload";
import {PostModel} from "../../post/post-model";

@Component({
  selector: 'app-user-pofile',
  templateUrl: './user-pofile.component.html',
  styleUrls: ['./user-pofile.component.css']
})
export class UserPofileComponent implements OnInit {

  name: string;
  posts!: PostModel[];
  comments!: CommentPayload[];
  postLength!: number;
  commentLength!: number;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
              private commentService: CommentService) {
    this.name = this.activatedRoute.snapshot.params.name;

    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });
    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }

  ngOnInit(): void {
  }

}
