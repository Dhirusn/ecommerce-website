import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductdetailComponent } from './pages/productdetail/productdetail.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RelatedProductComponent } from './components/related-product/related-product.component';
import { SameCategoryProductComponent } from './components/same-category-product/same-category-product.component';
import { ProductRoutingModule } from './product-routing.module';
import { CartComponent } from './pages/cart/cart.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserModule } from '@angular/platform-browser';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { OrderComponent } from './pages/order/order.component';
@NgModule({
  declarations: [
    ProductdetailComponent,
    RelatedProductComponent,
    SameCategoryProductComponent,
    CartComponent,
    ReviewsComponent,
    OrderComponent
  ],
  imports: [
    CommonModule, TooltipModule.forRoot(), TabsModule.forRoot(), ProductRoutingModule, CarouselModule
  ],
  exports: [ProductdetailComponent, RelatedProductComponent, SameCategoryProductComponent]
})
export class ProductModule { }
