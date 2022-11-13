export interface ISignInFormFields {
  login: string;
  password: string;
}

export interface ISignUpFormFields extends ISignInFormFields {
  name: string;
  agree: boolean;
}

export interface IUser {
  _id: 'string';
  name: 'string';
  login: 'string';
}

export interface ISignInResponse {
  token: 'string';
}

export interface IUserState {
  user: IUser | null;
  token: string | null;
}

export interface Error {
  data: {
    statusCode: number;
    message: string;
  };
}

export interface IErrorResponse {
  error: Error;
  isUnhandledError: boolean;
}
