export interface RegisterPayload {
  name: string;
  login: string;
  password: string;
}

export interface LoginPayload {
  login: string;
  password: string;
}

export interface AuthResponse {
  jwtToken: string;
  login: string;
}
