import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './component/login/login.component';
import { ListComponent } from './component/product/list/list.component';
import {JwtInterceptor} from "./helper/jwt-interceptor";
import {ErrorInterceptor} from "./helper/error-interceptor";
import {NavbarComponent} from './component/nav-bar/nav-bar/nav-bar.component';
import { CreateUserComponent } from './component/create-user/create-user.component';
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {environment} from "../environments/environment";
import { UploadAvatarComponent } from './component/upload-avatar/upload-avatar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    NavbarComponent,
     CreateUserComponent,
     UploadAvatarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],

  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},],
  bootstrap: [AppComponent],

})
export class AppModule { }
