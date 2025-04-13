import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'blog-token';
  private user = signal<any | null>(null);
  private http = inject(HttpClient);

  readonly currentUser = this.user.asReadonly();

  loginWithGoogle(token: string) {
    return this.http.post<{ token: string }>(`${environment.apiBaseUrl}/auth/google`, {
      token
    }).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res?.token);
        this.user.set(res);
      })
    ).toPromise();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.user.set(null);
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn() {
    return !!this.token;
  }
}
