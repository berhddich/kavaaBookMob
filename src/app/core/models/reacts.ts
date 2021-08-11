import { DefaultBaseModel } from "./base-model";

export interface CreateReactsModel {

  typeReact: number;
  userId: number;
  postId: number;


}
export interface EditReactsModel  extends DefaultBaseModel {

  typeReact: number;
  userId: number;
  postId: number;


}
