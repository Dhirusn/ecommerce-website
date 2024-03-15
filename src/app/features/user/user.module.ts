import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [LogInComponent, SignUpComponent, UserProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [LogInComponent, SignUpComponent, UserProfileComponent]
})
export class UserModule { }
