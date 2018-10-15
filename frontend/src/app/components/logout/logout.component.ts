import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, LoginStatus } from 'ngx-facebook';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService) {
  }

  public get isLoggedIn(): boolean {
    return this.loginService.isLoggedIn;
  }

  ngOnInit() {
  }

  public logout() {
    this.loginService.facebookLogout().then(() => {
      this.router.navigate(['login']);
    });
  }
}
