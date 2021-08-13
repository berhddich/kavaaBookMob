/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SegnalUserComponent } from './segnal-user.component';

describe('SegnalUserComponent', () => {
  let component: SegnalUserComponent;
  let fixture: ComponentFixture<SegnalUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegnalUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegnalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
