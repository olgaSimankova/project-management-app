import { FieldValues } from 'react-hook-form';

export type Board = {
  title: string;
  description: string;
};

export type BoardsContainerProps = {
  boards: BoardConfig[];
  isLoading: boolean;
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

export interface MainState {
  isModalOpen: boolean;
  boardID: string;
  modalOption: BoardFormOptions;
  isConfirmationOpen: boolean;
}

export enum BoardFormOptions {
  create = 'create',
  edit = 'edit',
}

export interface BoardFormProps {
  option: BoardFormOptions;
  onClick: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => void;
  onSubmit: (e: FieldValues) => void;
  defaultValue: Board;
}

export interface CardControlsButtonProps {
  id: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => void;
}

export interface BoardFormFields {
  title: string;
  description: string;
}

export interface ConfirmModalProps {
  question: string;
}

export interface ConfirmModalProps {
  question: string;
  onYesClick: () => void;
  onNoClick: () => void;
}

export interface ErrorObject {
  status: number;
  data: { message: string };
}
