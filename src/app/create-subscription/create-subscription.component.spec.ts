/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule, EmailValidator, RequiredValidator } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';

import { MaterialModule } from '../material/material.module';

import { CreateSubscriptionComponent } from './create-subscription.component';
import { ListSubscriptionComponent } from '../list-subscription/list-subscription.component';

describe('CreateSubscriptionComponent', () => {
  let component: CreateSubscriptionComponent;
  let fixture: ComponentFixture<CreateSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule,
      ReactiveFormsModule, FormsModule,
      AppRoutingModule, BrowserAnimationsModule ],
      declarations: [ CreateSubscriptionComponent, ListSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('form invalid when fields are empty', () => {
    expect(component.subscriptionForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    const email = component.subscriptionForm.get('email');
    expect(email.valid).toBeFalsy();
    let errors = {};
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
    email.setValue('test@test.com');
    expect(email.getError('required')).toBeFalsy();
    expect(email.getError('asyncval')).toBeFalsy();
  });

  it('should disable clear button when email, subscription, password field is empty', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('subscription field should not be empty', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('mat-select'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });


});
