import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ItemModel } from '../../../../models/entity';
import { ItemServiceService } from '../../../../services/item-service.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.scss'
})
export class ProductdetailComponent implements OnInit {
  public id = 161;
  public tablistButton: HTMLElement | undefined;
  @Output() newItemEvent = new EventEmitter<ItemModel>();
  public itemDetail: any;

  constructor(private itemService: ItemServiceService, private route: ActivatedRoute,private sanitizer:DomSanitizer) { }
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((obs) => {
      var productId = obs.get('id')
      this.getItemDetailById(productId);
    });
  }
  getItemDetailById(id: any) {
    this.itemService.getItembyId(id).subscribe(res => {
      this.itemDetail = res;
    });
  }
  incrementQuant() {
    var quantity = parseInt((<HTMLInputElement>document.getElementById("quantity")).value);
    if (quantity > 0) {
      quantity += 1;
      (<HTMLInputElement>document.getElementById("quantity")).value = quantity.toString();
    }
  }
  decrementQuant() {
    var quantity = parseInt((<HTMLInputElement>document.getElementById("quantity")).value);
    if (quantity > 1) {
      quantity -= 1;
      (<HTMLInputElement>document.getElementById("quantity")).value = quantity.toString();
    }
  }
  addToCart(id: any) {
    console.log("clicked");
    this.itemService.getItembyId(id).subscribe(res => {
      this.newItemEvent.emit(res);
    });
  }

}
