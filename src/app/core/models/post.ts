import { DefaultBaseModel } from "./base-model";

export interface CreatePostModel {

  content: string;
  urlsImg: any;


}


export interface EditPostModel  extends DefaultBaseModel {

  content: string;
  imageUrl: any;


}


export interface PostModel   extends DefaultBaseModel {

  content: string;
  imageUrl: any;


}
