import { Component } from '@angular/core';
import {UserToken} from "./models/user-token";
import {AuthenticationService} from "./service/authentication/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'product-connect-backend';

  currentUser: UserToken = {};

  constructor(private authenticationService: AuthenticationService) {
    this.currentUser = authenticationService.currentUserValue;
  }

  ngOnInit(){

  }

}
