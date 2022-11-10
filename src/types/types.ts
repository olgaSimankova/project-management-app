export interface IAuthInfo {
  login: string,
  password: string,
}

export interface IUser extends IAuthInfo {
  name: string,
}