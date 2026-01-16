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
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentProcessingComponent } from './pages/payment-processing/payment-processing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ProductdetailComponent,
    RelatedProductComponent,
    SameCategoryProductComponent,
    CartComponent,
    ReviewsComponent,
    OrderComponent,
    CheckoutComponent,
    PaymentProcessingComponent
  ],
  imports: [
    CommonModule, TooltipModule.forRoot(), TabsModule.forRoot(), ProductRoutingModule, CarouselModule, FormsModule, ReactiveFormsModule
  ],
  exports: [ProductdetailComponent, RelatedProductComponent, SameCategoryProductComponent]
})
export class ProductModule { }
