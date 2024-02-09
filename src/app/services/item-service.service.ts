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
  private url = "https://api.escuelajs.co/api/v1/products";

  constructor(private http: HttpClient) { }

  getFeaturedItems(){
    return this.http.get(this.url + '?offset=0&limit=6');
  }

  getLatestProductItems(){
    return this.http.get(this.url + '?offset=8&limit=16');
  }

  getItemDetail(id:string){
    return this.http.get(this.url+`/${id}`);
  }
}
