import { SelectChangeEvent } from '@mui/material';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { FieldValues } from 'react-hook-form';

export type Board = {
  title: string;
  description: string;
};

export type BoardsContainerProps = {
  boards: BoardConfig[];
  isLoading: boolean;
  isDeleting?: boolean;
  isEditing?: boolean;
  update: MutationTrigger<
    MutationDefinition<
      BoardConfig,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, unknown>,
        FetchBaseQueryMeta
      >,
      'boards',
      BoardConfig,
      'mainApi'
    >
  >;
};

export type BoardConfig = {
  _id?: string;
  title: string;
  owner: string;
  users: string[];
  isDeleting?: boolean;
  isEditing?: boolean;
  onChangeAssignee?: (event: SelectChangeEvent<string[]>, id: string) => void;
  assignees?: string[];
  onClose?: (id: string) => void;
  allUsers?: IUser[] | undefined;
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

export interface IErrorResponse {
  error: Error;
  isUnhandledError: boolean;
}

export interface MainState {
  isModalOpen: boolean;
  boardID: string;
  modalOption: BoardFormOptions;
  isConfirmationOpen: boolean;
  assignees: string[];
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
  isDeleting: boolean;
  isEditing: boolean;
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

export interface ColumnConfig {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface AssigneeProps {
  all: IUser[];
  selected: string[];
  handleChange: ((event: SelectChangeEvent<string[]>, id: string) => void) | undefined;
  id: string;
  onClose: ((id: string) => void) | undefined;
}
