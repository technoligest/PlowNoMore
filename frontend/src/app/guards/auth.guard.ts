import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {
  LoginService
} from '../services/login.service';


@Injectable()
export class AuthorizedGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin();
  }

  checkLogin(): Promise < boolean > {
    return new Promise((resolve, reject) => {
      this.loginService.isLoggedIn().then(() => {
          resolve(true);
      }).catch(() => {
          this.router.navigate(['/welcome']);
          reject(false);
      });
  });
  }
}
