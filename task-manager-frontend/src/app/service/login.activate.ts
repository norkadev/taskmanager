import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoginActivate implements CanActivate {
  constructor(private tokenService: TokenStorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean>|Promise<boolean>|boolean {
    if (!this.tokenService.getUser()) {
      this.router.navigate(['home']);
    }
    return true;
  }
}
