export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiresAt: Date;
  username: string;
  email: string;
  type:string;
  img?: [];
  roles?:[];
}
