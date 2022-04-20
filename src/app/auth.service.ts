import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, filter } from 'rxjs';
import { authCodeFlowConfig } from './auth.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private hasToken = new BehaviorSubject(false);
  public readonly hasToken$ = this.hasToken.asObservable();

  constructor(private oauthService: OAuthService, private router: Router) {
    console.debug('AuthService constructor');
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((e) => {
        const url = this.oauthService.state;
        console.debug('token_received', url);
        if (url) {
          this.router.navigateByUrl(decodeURIComponent(url));
        }
      });
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      console.debug('publish hasToken');
      this.hasToken.next(this.oauthService.hasValidAccessToken());
    });
  }

  logout(): void {
    this.oauthService.revokeTokenAndLogout();
  }

  hasValidAccessToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  login(url?: string) {
    this.oauthService.initLoginFlow(url);
  }
}
