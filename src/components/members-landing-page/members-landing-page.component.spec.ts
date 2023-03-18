import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersLandingPageComponent } from './members-landing-page.component';

describe('MembersLandingPageComponent', () => {
  let component: MembersLandingPageComponent;
  let fixture: ComponentFixture<MembersLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersLandingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
