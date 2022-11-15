export type Board = {
  title: string;
  description: string;
};

export type BoardsContainerProps = {
  boards: BoardConfig[];
};

export type BoardConfig = {
  _id?: string;
  title: string;
  owner: string;
  users: string[];
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

export interface MainState {
  boards: BoardConfig[];
  isModalOpen: boolean;
  currentBoardData: BoardConfig;
  modalOption: BoardFormOptions;
}

export enum BoardFormOptions {
  create = 'create',
  delete = 'delete',
}

export interface BoardFormProps {
  option: BoardFormOptions;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface CardControlsButtonProps {
  id: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => void;
}
