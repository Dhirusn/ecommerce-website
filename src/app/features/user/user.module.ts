import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  declarations: [LogInComponent, SignUpComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [LogInComponent, SignUpComponent]
})
export class UserModule { }
