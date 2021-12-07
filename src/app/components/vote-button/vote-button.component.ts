import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../post/post-model";
import {faArrowUp, faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {throwError} from "rxjs";
import {AuthService} from "../../shared/auth.service";
import {PostService} from "../post/post.service";
import {ToastrService} from "ngx-toastr";
import {VoteService} from "../../shared/vote.service";
import {VoteType} from "./vote-type";
import {VotePayload} from "./vote-payload";


@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input()
  post!: PostModel;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string='';
  downvoteColor: string = '';
  votePayload: VotePayload={voteType:0,postId:0};


  constructor(private voteService: VoteService,
              private authService: AuthService,
              private postService: PostService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    console.log('test');
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private vote() {
    this.votePayload.postId = this.post.postId;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.postId).subscribe(post => {
      this.post = post;
    });
  }
}
