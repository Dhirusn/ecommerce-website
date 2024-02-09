import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';



@NgModule({
  declarations: [ProductdetailComponent],
  imports: [
    CommonModule
  ],
  exports:[ProductdetailComponent]
})
export class ProductModule { }
