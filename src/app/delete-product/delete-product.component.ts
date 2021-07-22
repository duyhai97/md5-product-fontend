import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  product:any;
  productForm: FormGroup = new FormGroup({
    id:new FormControl(""),
    name :new FormControl(""),
    quantity :new FormControl(""),
    price :new FormControl("")
  });
  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private routers: Router) { }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      let id: any = paramMap.get("id");
      this.productService.get(id).subscribe(val => {
        this.productForm.controls['id'].setValue(val.id);
        this.productForm.controls['name'].setValue(val.name);
        this.productForm.controls['quantity'].setValue(val.quantity);
        this.productForm.controls['price'].setValue(val.price);
        console.log(11111, val);});

    })
  }


  deleteProduct(): void {
    this.productService.delete(this.productForm.value.id)
      .subscribe(
        response => {
          console.log(response);

        },
        error => {
          console.log(error);
        });
    this.routers.navigate(['/list'])

  }

}
