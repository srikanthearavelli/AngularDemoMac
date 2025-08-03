import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { getDemoCredentials, validatePasswordHash } from '../app-settings';

export interface LoginResponse {
  success: boolean;
  message?: string;
  user?: any;
}

export interface User {
  id: number;
  username: string;
  email?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  constructor() {}

  login(username: string, password: string): Observable<LoginResponse> {
    // Simulate API call delay and async password validation
    return new Observable<LoginResponse>(observer => {
      const demoCredentials = getDemoCredentials();
      if (username === demoCredentials.username) {
        validatePasswordHash(password, demoCredentials.passwordHash).then(isValid => {
          if (isValid) {
            const user: User = {
              id: 1,
              username: username,
              email: 'test@example.com',
              role: 'user'
            };
            this.setAuthToken('demo-token-' + Date.now());
            this.setCurrentUser(user);
            observer.next({ success: true, user });
          } else {
            observer.next({ success: false, message: 'Invalid username or password' });
          }
          observer.complete();
        });
      } else {
        observer.next({ success: false, message: 'Invalid username or password' });
        observer.complete();
      }
    }).pipe(delay(1000));
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  private setAuthToken(token: string): void {
    localStorage.setItem(this.STORAGE_KEY, token);
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}