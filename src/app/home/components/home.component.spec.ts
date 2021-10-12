import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let el: HTMLElement;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
        declarations: [HomeComponent],
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    fixture.detectChanges();
    const titleElement = el.querySelector('#home-label');
    expect(titleElement?.textContent).toContain('There\'s not much to do here except to go to the ');
  });
});
