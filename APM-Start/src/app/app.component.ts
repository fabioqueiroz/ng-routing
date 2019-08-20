import { Component } from '@angular/core';

import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RouterEvent } from '@angular/router';
import { AuthService } from './user/auth.service';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading = true;

  get isLoggedIn(): boolean {
    return this._authService.isLoggedIn;
  }

  get userName(): string {
    if (this._authService.currentUser) {
      return this._authService.currentUser.userName;
    }
    return '';
  }

  constructor(private _authService: AuthService, private _router: Router, private _messageService: MessageService) {
    _router.events.subscribe((routerEvent: RouterEvent) => {
      this.checkRouterEvent(routerEvent);
    });
   }

  checkRouterEvent(routerEvent: RouterEvent) {

      if (routerEvent instanceof NavigationStart) {
        this.loading = true;
      }

      if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationError || routerEvent instanceof NavigationCancel) {
        this.loading = false;
      }
  }

  logOut(): void {
    this._authService.logout();
    console.log('Log out');
  }

  displayMessages(): void {
    this._router.navigate([{ outlets: { popup: ['messages'] }}]);
    this._messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this._messageService.isDisplayed = false;
  }
}
