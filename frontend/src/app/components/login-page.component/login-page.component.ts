import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoginService } from '../../services/login.service';

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
              private loginService: LoginService) {
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
        this.router.navigate(['/customerList']);
      } else {
        console.log('NOT Logged into facebook');
      }
    }).catch(() => {
      console.log('some errors happened');
    });
  }
}
