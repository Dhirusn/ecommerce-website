import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SameCategoryProductComponent } from './same-category-product.component';

describe('SameCategoryProductComponent', () => {
  let component: SameCategoryProductComponent;
  let fixture: ComponentFixture<SameCategoryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SameCategoryProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SameCategoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
