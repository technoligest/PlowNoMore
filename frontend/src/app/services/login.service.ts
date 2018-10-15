import { Injectable } from '@angular/core';
import { baseUrl } from '../general.classes/Globals';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacebookService, InitParams, LoginStatus, LoginResponse } from 'ngx-facebook';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private facebookLoginStatus: LoginStatus;
  constructor(private httpClient: HttpClient,
              private fb: FacebookService,
              private loginSnackBar: MatSnackBar,
              private router: Router) {
    const initParams: InitParams = {
      appId: '2005654466400264',
      xfbml: true,
      version: 'v3.1'
    };
    this.fb.init(initParams);
    this.updateFacebookLoginStatus();
  }

  private updateFacebookLoginStatus() {
    this.fb.getLoginStatus().then((loginStatus: LoginStatus) => {
      this.facebookLoginStatus = loginStatus;
      console.log(loginStatus.status);
      if (loginStatus.status !== 'connected') {
        this.router.navigate(['login']);
        this.loginSnackBar.open('Oops, we couldn\'t authorize you', 'Ok', {duration: 5000});
      }
    });
  }

  public getToken(): string {
    return this.facebookLoginStatus && this.facebookLoginStatus.authResponse
           ? this.facebookLoginStatus.authResponse.accessToken
           : '';
  }

  public canLogIn(username: string, password: string): Observable<boolean> {
    const url = baseUrl + 'login/' + username + '/' + password;
    const options = {
      observe: 'body' as 'body',
      responseType: 'json' as 'json'
    };
    return this.httpClient.get<boolean>(url, options);
  }

  public facebookLogout(): Promise<boolean> {
    const result = new Promise<boolean>((resolve, reject) => {
      this.fb.logout().then(() => {
        this.updateFacebookLoginStatus();
        resolve(true);
      });
    });
    return result;
  }

  public facebookLogin(): Promise<boolean> {
    const result = new Promise<boolean>((resolve, reject) => {
      this.fb.login().then((loginResponse: LoginResponse) => {
        const isLoggedIn = loginResponse.status === 'connected';
        this.updateFacebookLoginStatus();
        resolve(isLoggedIn);
      });
    });
    return result;
  }

  public get isLoggedIn(): boolean {
    if (!this.facebookLoginStatus) {
      return false;
    }
    return this.facebookLoginStatus.status === 'connected';
  }
}
