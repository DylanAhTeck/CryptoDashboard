import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchFormComponent } from './search-form.component';
import { Router } from '@angular/router';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let title: HTMLElement;
  let form: HTMLElement;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']); // [2]

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SearchFormComponent],
      providers: [{ provide: Router, useValue: routerSpy }]
    })

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    title = fixture.nativeElement.querySelector('h1');
    form = fixture.nativeElement.querySelector('form');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(title).toBeDefined()
    expect(title.textContent).toEqual('Search Cryto Currencies');
  });

  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    const input = compiled.querySelector('input');

    expect(input).toBeTruthy();
  });

  it('should navigate to cryto detail when submitted', () => {

    const testSymbol = 'BTCAUD'
    const path = "/details"

    const expectedNavParams = [path, testSymbol]

    const searchInput = component.myControl
    searchInput.setValue(testSymbol);

    component.onSubmit();
    const [actualPath] = routerSpy.navigate.calls.first().args;
    expect(actualPath).toEqual(expectedNavParams, 'must navigate to the detail view for the submitted symbol')
  })
});
