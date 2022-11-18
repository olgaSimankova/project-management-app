export type Board = {
  title: string;
  description: string;
};

export type BoardsContainerProps = {
  boards: Board[];
};

export interface IAuthFormFields extends ISignInFormFields {
  name: string;
  agree: boolean;
}

export interface ISignInFormFields {
  login: string;
  password: string;
}

export interface IUserAuthInfo extends ISignInFormFields {
  name: string;
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
  login: string | null;
  token: string | null;
}

export interface IUserSavingData extends ISignInResponse {
  login: string;
}

export interface Error {
  data: {
    statusCode: number;
    message: string;
  };
}

export interface IColumnRequestParams extends IGetColumnParams {
  title: string;
  order: number;
}

export interface IColumn extends IColumnRequestParams {
  _id: string;
  boardId: string;
}

export interface IGetColumnParams {
  boardId: string;
  columnId?: string;
}
