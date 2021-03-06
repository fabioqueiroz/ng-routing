import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage: string;
  pageTitle = 'Log In';

  constructor(private _authService: AuthService, private _router: Router) { }

  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this._authService.login(userName, password);

      if (this._authService.redirectUrl) {
        this._router.navigateByUrl(this._authService.redirectUrl);
        
      } else {        
        // Navigate to the Product List page after log in.
        this._router.navigate(['/products']);
      }

    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
