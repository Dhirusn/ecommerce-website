import { Component, OnInit } from '@angular/core';
import { ItemModel } from '../../../../models/entity';
import { ItemServiceService } from '../../../../services/item-service.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrl: './related-product.component.scss'
})
export class RelatedProductComponent implements OnInit {
  public relatedItemList: ItemModel[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(private itemService: ItemServiceService, private sanitizer: DomSanitizer) { }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

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
          images: element?.images,
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
