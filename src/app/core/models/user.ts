export interface UserModel {
  id: number;
  fullName: string;
  birthDate: Date;
  email: string;
  urlPicture: string;


}

export interface CreateUserModel {

  FullName: string;
  BirthDate: Date;
  Email: string;
  UrlPicture: string;
  Password: string;


}

export interface CreateUserModel {
  fullName: string;
  birthDate: Date;
  email: string;
  urlPicture: string;
  password: string;


}
export interface LoginModel {

  Email: string;
  Password: string;


}


