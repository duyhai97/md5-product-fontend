import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {IProduct} from "../../models/iproduct";
import {Subscribable, Subscriber} from "rxjs";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  productList: any[] = [];


  constructor(private productService:ProductService) { }

  ngOnInit(): void {
   this.getListProduct()
  }

  getListProduct(): void {
    this.productService.getAll()
      .subscribe(
        list => {
          this.productList = list;
          console.log(list);
        },
        error => {
          console.log(error);
          console.log("loz");
        });
  }



}
