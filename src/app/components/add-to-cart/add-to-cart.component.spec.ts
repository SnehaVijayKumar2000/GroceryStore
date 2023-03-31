import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';
import { environment } from 'src/environments/environment';

import { AddToCartComponent } from './add-to-cart.component';

describe('AddToCartComponent', () => {
  let component: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;
  let router : Router
  let route : ActivatedRoute

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToCartComponent ],
      providers: [CartService, ItemsService],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        RouterTestingModule.withRoutes([])
      ]
  
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    route = TestBed.inject(ActivatedRoute)
    router.navigate(['/item/2t2Wo0xIHWHOhwQgdtuE'])
    fixture.detectChanges();
  });

  it('should navigate', () => {
    expect(component).toBeTruthy();
  });

  it('should disable button if quantity is less than 1', () => {
    component.quantity = 0;
    component.ngOnInit();
    const button = fixture.debugElement.query(By.css('#remove'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should enable button quantity is more than or equal to 1', () => {
      component.quantity = 1;
      component.ngOnInit();
      const button = fixture.debugElement.query(By.css('#remove'));
      expect(button.nativeElement.disabled).toBeFalsy();
  })
});
