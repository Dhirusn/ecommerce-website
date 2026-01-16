import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductdetailComponent } from './pages/productdetail/productdetail.component';
import { CartComponent } from './pages/cart/cart.component';
import { authGuard } from '../../guards/auth.guard';
import { OrderComponent } from './pages/order/order.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentProcessingComponent } from './pages/payment-processing/payment-processing.component';

const routes: Routes = [
  { path: 'detail/:id', component: ProductdetailComponent, runGuardsAndResolvers: 'always' },
  { path: 'cart', canActivate: [authGuard], component: CartComponent },
  { path: 'checkout', canActivate: [authGuard], component: CheckoutComponent },
  { path: 'payment-processing/:id', canActivate: [authGuard], component: PaymentProcessingComponent },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
