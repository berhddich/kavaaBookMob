import { DefaultBaseModel } from "./base-model";

export interface PostignalModel  extends DefaultBaseModel {

  reason: string;
  postId: number;
  userId: number;
  userSignalId: number;


}



export interface CreatePostignalModel   {

  reason: string;
  postId: number;
  membreSignalId: number;


}
