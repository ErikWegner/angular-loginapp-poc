import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private auth: AuthService) {
    console.log('AppComponent constructor');
  }

  ngOnInit(): void {
    this.auth.hasToken$.subscribe((hasToken) => (this.isLoggedIn = hasToken));
  }
  logout(): void {
    this.auth.logout();
  }
}
