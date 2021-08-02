import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../../service/product/products.service";
import {IProduct} from "../../../models/iproduct";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listProduct: IProduct[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProductList();
  }


  getProductList(): void {
    this.productService.getAll()
      .subscribe(
        list => {
          this.listProduct = list;
          console.log(list);
        },
        error => {
          console.log(error);
        });
  }
}
