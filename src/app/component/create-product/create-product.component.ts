import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IProduct} from "../../models/iproduct";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  productForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    quantity: new FormControl(),
    price: new FormControl(),
  });

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router
              ) {}

  ngOnInit(): void {
  }
  submitted = false;

  createProduct(): void {
    if (this.productForm.value as IProduct){
      this.productService.create(this.productForm.value)
        .subscribe(
          response => {
            this.router.navigate(['/list'])
            // console.log(response);
            console.log(this.productForm.value);
            this.submitted = true;
          },
          error => {
            console.log(error);
          });

    }
    else console.log(111);


  }

}
