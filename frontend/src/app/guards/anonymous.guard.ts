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
} from '../services';

@Injectable()
export class AnonymousGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin();
  }

  checkLogin(): Promise < boolean > {
    return new Promise((resolve, reject) => {
      this.loginService.isLoggedIn().then(() => {
        this.router.navigate(['/dashboard']);
        reject(false);
      }).catch(() => {
        resolve(true);
      });
    });
  }
}
