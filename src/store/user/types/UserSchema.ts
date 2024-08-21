// Interface for the User object
export interface IUser {
  id: number | null;
  email: string | null;
  isActivated: boolean;
}

// Interface for the Authentication Response
export interface IAuthResponse {
  accessToken: string | null;
  user: IUser;
}
