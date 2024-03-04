import { Component, OnInit } from '@angular/core';
import { ItemModel } from '../../../../models/entity';
import { ItemServiceService } from '../../../../services/item-service.service';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrl: './related-product.component.scss'
})
export class RelatedProductComponent implements OnInit {
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
