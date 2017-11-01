import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPaginateComponent } from './paginate.component';

fdescribe('NgxPaginateComponent', () => {
  let component: NgxPaginateComponent;
  let fixture: ComponentFixture<NgxPaginateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxPaginateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPaginateComponent);
    component = fixture.componentInstance;
    // component.options =
    // fixture.detectChanges();
  });

  it('should create correct range', () => {

    component.page = {
      currentPage: 1,
      pageSize: 5,
      totalItems: 89
    };

    fixture.detectChanges();

    expect(component.range).toEqual([1, 2, 3, 4, 5]);
  });

  it('should create correct range', () => {
    component.page = {
      currentPage: 3,
      pageSize: 5,
      totalItems: 89
    };

    fixture.detectChanges();

    expect(component.range).toEqual([1, 2, 3, 4, 5]);
  });


  it('should create correct range', () => {
    component.page = {
      currentPage: 6,
      pageSize: 5,
      totalItems: 89
    };

    fixture.detectChanges();

    expect(component.range).toEqual([4, 5, 6, 7, 8]);
  });


  it('should create correct range', () => {
    component.page = {
      currentPage: 15,
      pageSize: 5,
      totalItems: 89
    };

    fixture.detectChanges();

    expect(component.page.numberOfPages).toBe(18);

    expect(component.range).toEqual([13, 14, 15, 16, 17]);
  });


  it('should create correct range', () => {
    component.page = {
      currentPage: 16,
      pageSize: 5,
      totalItems: 89
    };

    fixture.detectChanges();

    expect(component.page.numberOfPages).toBe(18);

    expect(component.range).toEqual([14, 15, 16, 17, 18]);
  });


  it('should create correct range', () => {
    component.page = {
      currentPage: 17,
      pageSize: 5,
      totalItems: 89
    };

    fixture.detectChanges();

    expect(component.page.numberOfPages).toBe(18);

    expect(component.range).toEqual([14, 15, 16, 17, 18]);
  });

  it('should create correct range', () => {
    component.page = {
      currentPage: 18,
      pageSize: 5,
      totalItems: 89
    };

    fixture.detectChanges();

    expect(component.page.numberOfPages).toBe(18);

    expect(component.range).toEqual([14, 15, 16, 17, 18]);
  });


  it('should create correct range', () => {
    component.page = {
      currentPage: 1,
      pageSize: 3,
      totalItems: 6
    };

    fixture.detectChanges();

    expect(component.page.numberOfPages).toBe(2);

    expect(component.range).toEqual([1, 2]);
  });

  it('should create correct range', () => {
    component.page = {
      currentPage: 2,
      pageSize: 3,
      totalItems: 8
    };

    fixture.detectChanges();

    expect(component.page.numberOfPages).toBe(3);

    expect(component.range).toEqual([1, 2, 3]);
  });
});
