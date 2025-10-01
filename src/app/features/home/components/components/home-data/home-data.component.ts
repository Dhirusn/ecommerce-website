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
      debugger
      result.data.items.forEach((element: ItemModel) => {
        this.featuredItemList.push({
          id: element.id,
          images: element.images,
          description: element.description,
          categories: element.categories,
          productCategories: element.productCategories,
          title: element.title,
          price: element.price,
          imageUrl: element.imageUrl,
          stock: element.stock,
          brandId: element.brandId,
          brand: element.brand,
          attributes: element.attributes,
          productTags: element.productTags,
          reviews: element.reviews,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
          isDeleted: element.isDeleted,
          rating: 5  // optional if you want a UI-only field
        });
      });
    });
  }

  TodayDealsItemList() {
    this.itemService.getLatestProductItems().subscribe(res => {
      var result: any;
      result = res;
      result.data.items.forEach((element: ItemModel) => {
        this.featuredItemList.push({
          id: element.id,
          images: element.images,
          description: element.description,
          categories: element.categories,
          productCategories: element.productCategories,
          title: element.title,
          price: element.price,
          imageUrl: element.imageUrl,
          stock: element.stock,
          brandId: element.brandId,
          brand: element.brand,
          attributes: element.attributes,
          productTags: element.productTags,
          reviews: element.reviews,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
          isDeleted: element.isDeleted,
          rating: 5  // optional if you want a UI-only field
        });
      });
    });
  }

  addToCart(event: Event,) {

  }
}
