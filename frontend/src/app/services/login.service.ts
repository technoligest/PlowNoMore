import { Injectable } from '@angular/core';
import { baseUrl } from '../general.classes/Globals';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacebookService, InitParams, LoginStatus, LoginResponse } from 'ngx-facebook';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private static currToken: string;
  private facebookLoginStatus: LoginStatus;
  private http: AuthHttp;
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

  public isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (!this.facebookLoginStatus
          || this.facebookLoginStatus.status !== 'connected') {
        reject();
      }
      resolve();
    });
  }

  public getCurrentUser() {
    return new Promise((resolve, reject) => {
      const url = baseUrl + 'auth/me';
      return this.httpClient.get(url).toPromise()
      .then((response) => {
        resolve(response);
      })
      .catch(() => reject());
    });
  }

  //NEW STUFF BELOW
  public facebookLogin(): Promise<boolean> {
    const result = new Promise<boolean>((resolve, reject) => {
      this.fb.login().then((loginResponse: LoginResponse) => {
        const isLoggedIn = loginResponse.status === 'connected';
        if (isLoggedIn) {
          localStorage.setItem('token', loginResponse.authResponse.accessToken);
          const url = `${baseUrl}auth/facebook`;
          this.httpClient.post(url, '').toPromise().then((response: any) => {
            console.log('the response');
            console.log(response);
          });
        } else {
          reject();
        }
        this.updateFacebookLoginStatus();
        resolve(isLoggedIn);
      }).catch(() => {
        reject();
      });
    });
    return result;
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }
}
