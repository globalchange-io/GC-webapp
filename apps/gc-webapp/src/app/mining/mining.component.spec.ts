import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GCCoreService } from '@globalchange/core';

import { MiningComponent } from './mining.component';

describe('MiningComponent', () => {
  let component: MiningComponent;
  let fixture: ComponentFixture<MiningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiningComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatCheckboxModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: 'GLOBAL_CHANGE_CORE_SERVICE',
          useValue: new GCCoreService(),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
