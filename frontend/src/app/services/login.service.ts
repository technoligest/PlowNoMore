import { Injectable } from '@angular/core';
import { baseUrl } from '../general.classes/Globals';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  public canLogIn(username: string, password: string): Observable<boolean>{
    const url = baseUrl + 'login/' + username + '/' + password;
    const options = {
      observe: 'body' as 'body',
      responseType: 'json' as 'json'
    };
    return this.httpClient.get<boolean>(url, options);
  }
}
