import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RelatedProductComponent } from './components/related-product/related-product.component';
import { SameCategoryProductComponent } from './components/same-category-product/same-category-product.component';
import { ProductRoutingModule } from './product-routing.module';
@NgModule({
  declarations: [ProductdetailComponent,RelatedProductComponent,SameCategoryProductComponent],
  imports: [
    CommonModule, TooltipModule.forRoot(), TabsModule.forRoot(), ProductRoutingModule
  ],
  exports: [ProductdetailComponent,RelatedProductComponent,SameCategoryProductComponent]
})
export class ProductModule { }
