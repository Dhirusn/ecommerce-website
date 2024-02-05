import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http: HttpClient) { }

  getFeaturedItems(){
    var url = "https://fakestoreapi.com/products?limit=6";
    return this.http.get(url);
  }

  getLatestProductItems(){
    var url = "https://fakestoreapi.com/products";
    return this.http.get(url);
  }
}
