import { DefaultBaseModel } from "./base-model";

export interface UsersignalModel  extends DefaultBaseModel {

  commenterSignaler: string;
  userSignaledId: number;
  userWhoSignalId: number;


}



export interface CreateUsersignalModel   {

  commenterSignaler: string;
  userSignaledId: number;
  userWhoSignalId: number;


}
