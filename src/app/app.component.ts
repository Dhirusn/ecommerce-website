import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeModule} from './features/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './features/product/product.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HomeModule,HttpClientModule,SharedModule,ProductModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[HttpClientModule]
})
export class AppComponent {
  title = 'ecommerce-website';
}
