import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs';
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
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((e) => {
        console.debug('token_received', this.oauthService.state);
      });
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.isLoggedIn = this.oauthService.hasValidAccessToken();
    });
  }

  logout(): void {
    this.oauthService.revokeTokenAndLogout();
  }
}
