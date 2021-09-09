import { DefaultBaseModel } from "./base-model";

export interface CreateReactsModel {

  typeReact: number;
  userUserName: string;
  postId: number;


}
export interface EditReactsModel  extends DefaultBaseModel {

  typeReact: number;
  userUserName: string;
  postId: number;


}
