import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      providers: [ AuthService ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        RouterTestingModule,
        FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('123456 should have a password strength of 1', () => {
    expect(component.checkPasswordStrength('123456')).toBe(0);
  })

  it('123456a should have a password strength of 2', () => {
    expect(component.checkPasswordStrength('123456a')).toBe(1);
  });

  it('123456a! should have a password strength of 3', () => {
    expect(component.checkPasswordStrength('123456a!')).toBe(3);
  });

  it('123456a!A should have a password strength of 3', () => {
    expect(component.checkPasswordStrength('123456a!A')).toBe(4);
  });

});
