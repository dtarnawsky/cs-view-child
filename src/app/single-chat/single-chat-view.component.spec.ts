import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChatViewComponent } from './single-chat-view.component';

describe('SingleChatViewComponent', () => {
  let component: SingleChatViewComponent;
  let fixture: ComponentFixture<SingleChatViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleChatViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleChatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
