import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProduct} from "../../models/iproduct";

const URL = 'http://localhost:8080/product'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(URL);
  }

  create(data: IProduct): Observable<IProduct> {
    return this.http.post(URL, data);
  }
}
