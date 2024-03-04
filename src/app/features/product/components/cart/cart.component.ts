import { Component, Input, OnInit } from '@angular/core';
import { ItemModel } from '../../../../models/entity';
import { ItemServiceService } from '../../../../services/item-service.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  @Input() cartItemList: ItemModel[] = [];
  @Input() cartItemList2: ItemModel[] = [];

  constructor(private itemService: ItemServiceService) { }

  ngOnInit(): void {
    this.addFeaturedItemList();
    console.log(this.cartItemList);
  }
  addFeaturedItemList() {
    this.itemService.getFeaturedItems().subscribe(res => {
      var result: any;
      result = res;
      result.forEach((element: { id: any; images: any; description: any; category: any; title: any; price: any; creationAt: any; updatedAt: any }) => {
        this.cartItemList2.push({
          id: element.id,
          images: element.images,
          description: element.description,
          category: element.category,
          title: element.title,
          price: element.price,
          creationAt: element.creationAt,
          updatedAt: element.updatedAt,
          rating: 5
        })
      });
    });
  }
  deleteFromCart(){
    console.log("deleted");
  }

  addToCart(id: any) {
    console.log("clicked");
    this.itemService.getItembyId(id).subscribe((res:ItemModel) => {
        this.cartItemList.push(res);
        console.log(this.cartItemList);
    });
  }
}
