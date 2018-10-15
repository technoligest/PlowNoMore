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
} from '../../general.classes/Globals';
import { MatSnackBar } from '@angular/material';
import { LoginService } from '../../services/login.service';
import { FacebookService, InitParams, LoginStatus } from 'ngx-facebook';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public hidePassword = true;
  public username: string;
  public password: string;

  constructor(private router: Router,
              public loginSnackBar: MatSnackBar,
              private loginService: LoginService){
  }

  ngOnInit() {}

  public openSnakBar(message: string, buttonName: string) {
    this.loginSnackBar.open(message, buttonName, {});
  }

  public login() {
    this.loginService.canLogIn(this.username, this.password).subscribe(
      (canLogIn: boolean) => {
          if (canLogIn) {
            this.loginSnackBar.dismiss();
            this.router.navigate(['customerlist']);
          } else {
            this.openSnakBar('Incorrect username or password.', 'close');
          }
        }
    );
  }

  public facebookLogin() {
    this.loginService.facebookLogin().then((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        console.log("Logged Into FAcebook!!");
      } else {
        console.log("NOT Logged into facebook");
      }
    });
  }
}
