import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListProductComponent} from "./component/list-product/list-product.component";
import {UpdateProductComponent} from "./component/update-product/update-product.component";
import {CreateProductComponent} from "./component/create-product/create-product.component";
import {DetailsComponent} from "./component/details/details.component";
import {DeleteProductComponent} from "./delete-product/delete-product.component";

const routes: Routes = [
  {path:'list', component:ListProductComponent
  },
  {path:'details/:id', component:DetailsComponent},
  {
    path: 'update/:id',
    component: UpdateProductComponent
  },
  {
    path:'delete/:id',
    component: DeleteProductComponent
  },
  {
    path:'create',
    component: CreateProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
