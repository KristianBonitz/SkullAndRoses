import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMatComponent } from './player-mat.component';

describe('PlayerMatComponent', () => {
  let component: PlayerMatComponent;
  let fixture: ComponentFixture<PlayerMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerMatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
