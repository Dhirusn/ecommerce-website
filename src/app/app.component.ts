import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeModule} from './features/home/home.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HomeModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[HttpClientModule]
})
export class AppComponent {
  title = 'ecommerce-website';
}
