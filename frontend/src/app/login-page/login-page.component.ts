import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  HttpClient
} from '@angular/common/http';
import {
  baseUrl
} from '../general.classes/Globals';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public hidePassword = true;
  public username: string;
  public password: string;

  constructor(private router: Router, private httpClient: HttpClient, public loginSnackBar: MatSnackBar) {}

  ngOnInit() {}
  public openSnakBar(message: string, buttonName: string) {
    this.loginSnackBar.open(message, buttonName, {});
  }

  public login() {
    const url = baseUrl + 'login/' + this.username + '/' + this.password;
    const options = {
      observe: 'body' as 'body',
      responseType: 'json' as 'json'
    };
    this.httpClient.get<boolean>(url, options).subscribe(
      (canLogOn: boolean) => {
          if (canLogOn) {
            this.loginSnackBar.dismiss();
            this.router.navigate(['customerlist']);
          } else {
            this.openSnakBar('Incorrect username or password', 'close');
          }
        }
    );
    // const res = this.router.navigate(['customerlist']);
  }
}
