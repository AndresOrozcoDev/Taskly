import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetFormComponent } from './forget-form.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ForgetFormComponent', () => {
  let component: ForgetFormComponent;
  let fixture: ComponentFixture<ForgetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ForgetFormComponent,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
