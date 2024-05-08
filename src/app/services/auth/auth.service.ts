import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSuject = new BehaviorSubject<boolean>(false);

  private http = inject(HttpClient);

  constructor(
    private router: Router
  ) { }

  login(user: { email: string, password: string }): Observable<any> {
    return this.http.post('http://localhost:8080/auth/login', user).pipe(
      tap((tokens: any) => this.doLoginUser(user.email, JSON.stringify(tokens))),
    )
  }

  private doLoginUser(email: string, token: any) {
    this.loggedUser = email;
    this.storeJwtToken(token);
    this.isAuthenticatedSuject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSuject.next(false);
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return localStorage.getItem(this.JWT_TOKEN) !== null;
  }

  isTokenExpired() {
    const tokens = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) {
      return true;
    }
    const token = JSON.parse(tokens).access_token
    const decoded = jwtDecode(token);
    if (!decoded.exp) {
      return true;
    }
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();

    return expirationDate < now;
  }
}
