import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Pages/home.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeDataComponent } from './components/components/home-data/home-data.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeRoutingModule } from './home-routing.module';
import { RouterOutlet } from '@angular/router';


@NgModule({
  declarations: [HomeComponent,HomeDataComponent],
  imports: [
    CommonModule,SharedModule,HttpClientModule,HomeRoutingModule,RouterOutlet
  ],
  exports:[HomeComponent,HomeDataComponent]
})
export class HomeModule { }
