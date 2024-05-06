import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [RouterOutlet,SharedModule],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {

}
