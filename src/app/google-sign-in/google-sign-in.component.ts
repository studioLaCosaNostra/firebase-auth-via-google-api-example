import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../google-auth.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrls: ['./google-sign-in.component.scss']
})
export class GoogleSignInComponent {
  user$: Observable<firebase.User>;

  constructor(
    private googleAuth: GoogleAuthService
  ) {
    this.user$ = this.googleAuth.user;
  }

  login() {
    this.googleAuth.signIn();
  }

  logout() {
    this.googleAuth.signOut();
  }

}
