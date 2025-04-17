import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ForgetComponent } from './forget.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ForgetComponent', () => {
  let component: ForgetComponent;
  let fixture: ComponentFixture<ForgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ForgetComponent,
        TranslateModule.forRoot()
      ],
      providers: [
              provideHttpClient(),
              provideHttpClientTesting()
            ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
