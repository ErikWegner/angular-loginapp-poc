import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private oAuthService: OAuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const hasValidAccessToken = this.oAuthService.hasValidAccessToken();
    console.debug(`AuthGuard: hasValidAccessToken = ${hasValidAccessToken}`);
    if (hasValidAccessToken) {
      return true;
    } else {
      this.oAuthService.initCodeFlow(state.url);
    }

    return false;
  }
}
