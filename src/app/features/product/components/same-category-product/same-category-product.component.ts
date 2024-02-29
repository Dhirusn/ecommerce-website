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
      result.forEach((element: { id: any; images: any; description: any; category: any; title: any; price: any; creationAt: any; updatedAt: any }) => {
        this.relatedItemList.push({
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
}
