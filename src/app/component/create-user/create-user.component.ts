import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {UserToken} from "../../models/user-token";
// import * as url from "url";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm : FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
   fullName: new FormControl(),
  })

  avatarFile: any;
  avatarUrl:any;
  currentUser: UserToken = {};


  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router,
              private storage: AngularFireStorage ) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user
  })
  }


  submitted = false;

  createUser(): void {
    if (this.userForm.value as User){
      this.authenticationService.create(this.userForm.value)
        .subscribe(
          response => {
            alert("Create success")
            this.router.navigate(['/login'])
            // console.log(response);
            console.log(this.userForm.value);
            this.submitted = true;
          },
          error => {
            console.log(error);
          });
    }
  }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
  exit(){
    this.router.navigate(['/list'])
  }

  // addAvatar() {
  //   if (this.avatarFile != null){
  //     const filePath = `${this.avatarFile.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
  //     const fileRef = this.storage.ref(filePath);
  //     this.storage.upload(filePath,this.avatarFile).snapshotChanges().pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe(url => {
  //           console.log("abc", url);
  //           this.currentUser.avatar = url;
  //         });
  //       })
  //     ).subscribe();
  //   }
  // }


  // setAvatar(event: any) {
  //   if (event.target.files && event.target.files[0]){
  //     const reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0])
  //     reader.onload = (e: any) => this.avatarUrl = e.target.result;
  //     console.log(111, this.avatarUrl);
  //     this.avatarFile =  event.target.files[0];
  //   }
  //   else this.avatarUrl = null;
  // }
  //
  // updateAvatar(){
  //   if (this.avatarFile != null){
  //     const filePath = `${this.avatarFile.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
  //     const fileRef = this.storage.ref(filePath);
  //     this.storage.upload(filePath,this.avatarFile).snapshotChanges().pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe(url => {
  //
  //         });
  //       })
  //     ).subscribe();
  //   }
  // }

  // updateToDatabase(){
  //
  // }
}
