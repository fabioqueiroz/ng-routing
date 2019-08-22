import { Injectable } from '@angular/core';

import { User } from './user';
import { MessageService } from '../messages/message.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  redirectUrl: string;

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  constructor(private _messageService: MessageService, private _router: Router) { }

  login(userName: string, password: string): void {
    if (!userName || !password) {
      this._messageService.addMessage('Please enter your userName and password');
      return;
    }
    if (userName === 'admin') {
      this.currentUser = {
        id: 1,
        userName: userName,
        isAdmin: true
      };
      this._messageService.addMessage('Admin login');
      return;
    }
    this.currentUser = {
      id: 2,
      userName: userName,
      isAdmin: false
    };
    this._messageService.addMessage(`User: ${this.currentUser.userName} logged in`);
  }

  logout(): void {
    this.currentUser = null;

    // navigateByUrl ensures every existing paramenter or 
    // secondary route is removed when the user logs out
    this._router.navigateByUrl('/welcome');
  }
}
