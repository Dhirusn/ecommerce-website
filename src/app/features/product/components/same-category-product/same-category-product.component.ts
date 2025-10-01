import { Component } from '@angular/core';
import { ItemServiceService } from '../../../../services/item-service.service';
import { ItemModel } from '../../../../models/entity';

@Component({
  selector: 'app-same-category-product',
  templateUrl: './same-category-product.component.html',
  styleUrl: './same-category-product.component.scss'
})
export class SameCategoryProductComponent {
  public relatedItemList: ItemModel[] = [];

  constructor(private itemService: ItemServiceService) { }

  ngOnInit(): void {
    this.addFeaturedItemList();
  }

  addFeaturedItemList() {
    this.itemService.getFeaturedItems().subscribe(res => {
      var result: any;
      result = res;
      result.data.items.forEach((element: ItemModel) => {
        this.relatedItemList.push({
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
}
