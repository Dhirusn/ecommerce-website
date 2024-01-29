import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Pages/home.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeDataComponent } from './components/components/home-data/home-data.component';


@NgModule({
  declarations: [HomeComponent,HomeDataComponent],
  imports: [
    CommonModule,SharedModule
  ],
  exports:[HomeComponent,HomeDataComponent]
})
export class HomeModule { }
