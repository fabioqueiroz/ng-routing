import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Acme Product Management';

  get isLoggedIn(): boolean {
    return this._authService.isLoggedIn;
  }

  get userName(): string {
    if (this._authService.currentUser) {
      return this._authService.currentUser.userName;
    }
    return '';
  }

  constructor(private _authService: AuthService) { }

  logOut(): void {
    this._authService.logout();
    console.log('Log out');
  }
}
