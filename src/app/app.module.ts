import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { CallbackComponent } from './callback/callback.component';
import { ProtectedComponent } from './protected/protected.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, NotFoundComponent, FrontpageComponent, CallbackComponent, ProtectedComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    OAuthModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
