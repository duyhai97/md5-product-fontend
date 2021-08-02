import { Component, OnInit } from '@angular/core';
import {UserToken} from "../../../models/user-token";
import {AuthenticationService} from "../../../service/authentication/authentication.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: UserToken = {};

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    console.log(this.currentUser)
  }

  logout() {
    this.authenticationService.logout();

  }
}
