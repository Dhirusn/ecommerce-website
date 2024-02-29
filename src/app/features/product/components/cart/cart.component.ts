import { Component, Input } from '@angular/core';
import { ItemModel } from '../../../../models/entity';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
    @Input() cartItemList : ItemModel[] = [];
}
