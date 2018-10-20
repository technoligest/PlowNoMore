import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit() {
  }

  public logout() {
    this.loginService.facebookLogout().then(() => {
      this.router.navigate(['login']);
    });
  }
}
