import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductdetailComponent } from './pages/productdetail/productdetail.component';
import { CartComponent } from './pages/cart/cart.component';
import { authGuard } from '../../guards/auth.guard';

const routes: Routes = [
  { path: 'detail/:id', component: ProductdetailComponent, runGuardsAndResolvers: 'always' },
  { path: 'cart', canActivate: [authGuard], component: CartComponent },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
