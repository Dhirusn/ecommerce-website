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
  public todayDealItemList: ItemModel[] = [];
  constructor(private itemService: ItemServiceService) { }

  ngOnInit(): void {
    this.addFeaturedItemList();
    this.TodayDealsItemList();
  }

  addFeaturedItemList() {
    this.itemService.getFeaturedItems().subscribe(res => {
      var result: any;
      result = res;
      result.forEach((element: { id: any; images: any; description: any; category: any; title: any; price: any; creationAt: any; updatedAt: any }) => {
        this.featuredItemList.push({
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

  TodayDealsItemList() {
    this.itemService.getLatestProductItems().subscribe(res => {
      var result: any;
      result = res;
      result.forEach((element: { id: any; images: any; description: any; category: any; title: any; price: any; creationAt: any; updatedAt: any }) => {
        this.todayDealItemList.push({
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

  addToCart(event: Event,) {

  }
}
