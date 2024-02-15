import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RelatedProductComponent } from './components/related-product/related-product.component';
@NgModule({
  declarations: [ProductdetailComponent,RelatedProductComponent],
  imports: [
    CommonModule, TooltipModule.forRoot(), TabsModule.forRoot()
  ],
  exports: [ProductdetailComponent,RelatedProductComponent]
})
export class ProductModule { }
