import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IProduct} from "../../models/iproduct";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

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


  updateProduct(): void {
    this.productService.update(this.productForm.value.id, this.productForm.value)
      .subscribe(
        response => {
          console.log(response);
          this.routers.navigate(['/list'])
        },
        error => {
          console.log(error);
        });

  }


}
