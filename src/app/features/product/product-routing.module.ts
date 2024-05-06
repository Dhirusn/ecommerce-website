import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: 'detail/:id', component: ProductdetailComponent,runGuardsAndResolvers:'always' },
  { path: 'cart', component:CartComponent},

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ProductRoutingModule { }
