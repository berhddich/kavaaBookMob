import { DefaultBaseModel } from "./base-model";

export interface CreateReactsModel {

  typeReact: number;
  postId: number;


}
export interface EditReactsModel  extends DefaultBaseModel {

  typeReact: number;
  postId: number;


}
