// src/app/services/dtos/auth.dtos.ts
export interface RegisterDto {
  email: string;
  password: string;
  confirmPassword?: string; // optional, if your backend requires
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshDto {
  refreshToken: string;
}

export interface RevokeDto {
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}
