import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {ListComponent} from "./component/product/list/list.component";
import {CreateUserComponent} from "./component/create-user/create-user.component";
import {UploadAvatarComponent} from "./component/upload-avatar/upload-avatar.component";



const routes: Routes = [

  {
    path:"login",
   component:LoginComponent
  },
  {
    path:"list", component:ListComponent
  },
  {
    path:"create",
    component:CreateUserComponent
  },
  {
    path:"uploadAvatar",
    component:UploadAvatarComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
