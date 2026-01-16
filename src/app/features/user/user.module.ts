import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserOrdersComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [UserProfileComponent]
})
export class UserModule { }
