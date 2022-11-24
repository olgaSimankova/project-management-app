import { SelectChangeEvent } from '@mui/material';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
  FieldErrorsImpl,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

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
  onClose?: (event: React.SyntheticEvent<Element, Event>, id: string) => void;
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
  _id: string;
  name: string;
  login: string;
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

export interface IColumnRequestParams extends IGetParams {
  title: string;
  order: number;
}

export interface IColumn extends IColumnRequestParams {
  _id?: string;
  boardId: string;
}

export interface IGetParams {
  boardId?: string;
  columnId?: string;
  taskId?: string;
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

export enum BOARD_BUTTONS {
  ADD_TASK = 'add-task',
  ADD_COLUMN = 'add-column',
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
  onClose: ((event: React.SyntheticEvent<Element, Event>, id: string) => void) | undefined;
}

export interface EditableTextFieldProps {
  defaultValue: string;
  isDisabled: boolean;
  handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tag: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, tag: string) => void;
  tag: 'name' | 'password' | 'login';
  register: UseFormRegister<UserFields>;
  errors: Partial<
    FieldErrorsImpl<{
      name: string;
      login: string;
      password: string;
    }>
  >;
}

export interface CheckPasswordModalProps {
  onClickYes: (password: string) => void;
  onClickNo: () => void;
  isWrongPassword: boolean;
  isLoading: boolean;
}

export interface FullUserData {
  _id: string;
  name: string;
  login: string;
  password: string;
}

export interface ITaskConfig extends IColumn {
  description: string;
  userId: string;
  users: string[];
}

export interface ThemeSlice {
  theme?: string;
}

export interface UserFields {
  name: string;
  login: string;
  password: string;
}

export interface SettingsContainerProps {
  handleCloseConfirmWindow: () => void;
  handleDelete: () => void;
  isError: boolean;
  isLoading: boolean;
  handleSubmit: UseFormHandleSubmit<UserFields>;
  handleClickConfirmChanges: () => void;
  credits: { name: string; login: string; password: string; oldPassword: string };
  register: UseFormRegister<UserFields>;
  errors: Partial<
    FieldErrorsImpl<{
      name: string;
      login: string;
      password: string;
    }>
  >;
  flags: {
    name: boolean;
    login: boolean;
    password: boolean;
    isModal: boolean;
    isDisabled: boolean;
    isConfirmOpen: boolean;
  };
  handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tag: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, tag: string) => void;
  deleteLoading: boolean;
  handleDeleteClick: () => void;
  checkPassword: (password: string) => void;
  closeModal: () => void;
}
