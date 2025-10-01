// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterDto, LoginDto, RefreshDto, RevokeDto, AuthResponse } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ACCESS_KEY = 'accessToken';
  private readonly REFRESH_KEY = 'refreshToken';

  private readonly apiUrl = 'https://localhost:7260/account'; // update with your API base URL
  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  public isLoggedIn$ = this._isLoggedIn$.asObservable();
  constructor(private http: HttpClient) { }

  register(model: RegisterDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, model);
  }

  login(model: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, model);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.ACCESS_KEY);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now(); // not expired
    } catch {
      return false;
    }
  }

  refresh(model: RefreshDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, model);
  }

  revoke(model: RevokeDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/revoke`, model);
  }

  // Optional: helper methods for token storage
  saveTokens(tokens: AuthResponse) {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
  // Recommended: clear tokens and reload the page so app state resets
  logout(reload: boolean = true) {
    // optional: call backend revoke endpoint here (fire-and-forget)
    this.clearTokens();

    if (reload) {
      // full page reload to clear any in-memory state (services, stores, etc.)
      window.location.reload();
    }
  }
}
