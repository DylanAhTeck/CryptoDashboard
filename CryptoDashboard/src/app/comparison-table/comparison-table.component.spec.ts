import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComparisonTableComponent } from './comparison-table.component';

describe('ComparisonTableComponent', () => {
  let component: ComparisonTableComponent;
  let fixture: ComponentFixture<ComparisonTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ComparisonTableComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonTableComponent);
    component = fixture.componentInstance;
    component.symbol = "BTCAUD"
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
