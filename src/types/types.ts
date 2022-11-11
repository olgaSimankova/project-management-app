export interface IAuthInfo {
  login: string;
  password: string;
}

export interface IUser extends IAuthInfo {
  name: string;
}

export interface ISignInFormFields {
  login: string;
  password: string;
}

export interface ISignUpFormFields extends ISignInFormFields {
  name: string;
  agree: boolean;
}
