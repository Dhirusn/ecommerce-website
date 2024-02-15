import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.scss'
})
export class ProductdetailComponent implements OnInit {
  public tablistButton: HTMLElement | undefined;
  ngOnInit(): void {
}
}
