import { DefaultBaseModel } from "./base-model";

export interface CommentslModel  extends DefaultBaseModel {

  comment: string;
  postId: number;
  userId: number;



}



export interface CreateCommentsModel   {

  comment: string;
  postId: number;
  userId: number;


}
