import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedIn = false;

  constructor(private oauthService: OAuthService) {
    console.log('AppComponent constructor');
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService
      .loadDiscoveryDocumentAndTryLogin({
        onTokenReceived: (context) => {
          //
          // Output just for purpose of demonstration
          // Don't try this at home ... ;-)
          //
          console.debug('logged in');
          console.debug(context);
          this.isLoggedIn = true;
        },
      })
      .then(() => {
        this.isLoggedIn = this.oauthService.hasValidAccessToken();
      });
  }

  logout(): void {
    this.oauthService.revokeTokenAndLogout();
  }
}
