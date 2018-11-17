import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2ActorComponent } from './ng2-actor.component';

describe('Ng2ActorComponent', () => {
  let component: Ng2ActorComponent;
  let fixture: ComponentFixture<Ng2ActorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2ActorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2ActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
