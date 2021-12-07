import {VoteType} from './vote-type';

export class VotePayload {
  constructor(
    public voteType: VoteType,
    public postId: number
  ){
    voteType=VoteType.DOWNVOTE;
  }
}
