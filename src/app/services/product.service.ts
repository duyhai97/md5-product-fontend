import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProduct} from "../models/iproduct";

const URL = 'http://localhost:8080/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(URL);
  }

  get(id: any): Observable<IProduct> {
    return this.http.get(`${URL}/${id}`);
  }

  create(data: IProduct): Observable<IProduct> {
    return this.http.post(URL, data);
  }

  update(id: any, data: IProduct): Observable<IProduct> {
    return this.http.put(`${URL}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${URL}/${id}`);
  }


}
