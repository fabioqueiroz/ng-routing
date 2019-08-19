import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import { slideInAnimation } from './app.animation';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
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
