import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RelatedProductComponent } from './components/related-product/related-product.component';
import { SameCategoryProductComponent } from './components/same-category-product/same-category-product.component';
import { ProductRoutingModule } from './product-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [ProductdetailComponent, RelatedProductComponent, SameCategoryProductComponent, CartComponent],
  imports: [
    CommonModule, TooltipModule.forRoot(), TabsModule.forRoot(), ProductRoutingModule, CarouselModule
  ],
  exports: [ProductdetailComponent, RelatedProductComponent, SameCategoryProductComponent]
})
export class ProductModule { }
