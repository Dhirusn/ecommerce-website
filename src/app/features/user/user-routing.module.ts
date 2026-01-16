import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';


const routes: Routes = [
  { path: 'profile', component: UserProfileComponent },
  { path: 'orders', component: UserOrdersComponent },
  { path: 'orders/:id', component: OrderDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
