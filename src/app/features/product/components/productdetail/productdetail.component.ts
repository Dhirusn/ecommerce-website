import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ItemModel } from '../../../../models/entity';
import { ItemServiceService } from '../../../../services/item-service.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.scss'
})
export class ProductdetailComponent implements OnInit {
  public id = 161;
  public tablistButton: HTMLElement | undefined;
  @Output() newItemEvent = new EventEmitter<ItemModel>();

  constructor(private itemService: ItemServiceService) { }

  ngOnInit(): void {
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
