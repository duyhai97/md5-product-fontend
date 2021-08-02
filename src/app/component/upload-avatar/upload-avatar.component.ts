import { Component, OnInit } from '@angular/core';
import {finalize} from "rxjs/operators";
import {UserToken} from "../../models/user-token";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.css']
})
export class UploadAvatarComponent implements OnInit {

  avatarFile: any;
  avatarUrl:any;
  currentUser: UserToken = {};

  userForm: FormGroup = new FormGroup({
    id:new FormControl(""),
    username :new FormControl(""),
    password :new FormControl(""),
    name :new FormControl("")
  });


  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap =>{
      let id: any = paramMap.get("id");
      this.authenticationService.getById(id).subscribe(val => {
        this.userForm.controls['id'].setValue(val.id);
        this.userForm.controls['title'].setValue(val.username);
        this.userForm.controls['author'].setValue(val.password);
        this.userForm.controls['description'].setValue(val.avatar);
        console.log(11111, val);});

    })
  }

  editAvatar(): void {
    this.authenticationService.update(this.userForm.value.id, this.userForm.value)
      .subscribe(
        response => {
          alert("Edit success")
          console.log(response);
          this.router.navigate(['/list'])
        },
        error => {
          console.log(error);
        });
  }
  exit(){
    this.router.navigate(['/list'])
  }

  addAvatar() {
    if (this.avatarFile != null){
      const filePath = `${this.avatarFile.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.avatarFile).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log("abc", url);
            this.userForm.value.name = url;
          });
        })
      ).subscribe();
    }
  }


  setAvatar(event: any) {
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (e: any) => this.avatarUrl = e.target.result;
      console.log(111, this.avatarUrl);
      this.avatarFile =  event.target.files[0];
    }
    else this.avatarUrl = null;
  }

}
