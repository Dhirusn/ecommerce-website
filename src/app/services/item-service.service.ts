import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ItemModel } from '../models/entity';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {
  private url = "https://localhost:7260/products";

  constructor(private http: HttpClient) { }

  getItembyId(id: any){
    return this.http.get<ItemModel>(this.url + `/GetById/${id}`);
  }

  getFeaturedItems(){
    return this.http.get(this.url + '/getall');
  }

  getLatestProductItems(){
    return this.http.get(this.url + '?offset=8&limit=16');
  }

  getItemDetail(id:string){
    return this.http.get(this.url+`/${id}`);
  }
}
