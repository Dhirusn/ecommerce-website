import { Component, OnInit } from '@angular/core';
import { ItemServiceService } from '../../../../../services/item-service.service';
import { map } from 'rxjs';
import { ItemModel } from '../../../../../models/entity';
@Component({
  selector: 'app-home-data',
  templateUrl: './home-data.component.html',
  styleUrl: './home-data.component.scss'
})
export class HomeDataComponent implements OnInit {

  public featuredItemList: ItemModel[] = [];
  constructor(private itemService: ItemServiceService) { }

  ngOnInit(): void {
    this.addFeaturedItemList();
  }

  addFeaturedItemList() {
    this.itemService.getFeaturedItems().subscribe(res => {
      var result: any;
      result = res;
      result.forEach((element: { id: any; image: any; description: any; category: any; title: any; price: any; rating: { rate: any; count: any; }; }) => {
        this.featuredItemList.push({
          itemId: element.id,
          imgSrc: element.image,
          itemDetail: element.description,
          category: element.category,
          itemTitle: element.title,
          price: element.price,
          itemRating: element.rating.rate,
          ratingCount: element.rating.count,
          itemDiscountPrice: 199
        })
      });
    });
  }

  addToCart(event: Event,) {

  }
}
