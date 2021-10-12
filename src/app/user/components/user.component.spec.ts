import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { ConfirmationService } from 'src/app/shared/services/confimation/confirmation.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UserComponent } from './user.component';

describe('UserComponent', () => {

  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let el: HTMLElement;

  class FakeRouter {
    navigate(routes: string[]): Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {
      });
    }
  }

  class FakeUserService {
    listAll(): Observable<User[]> {
      return of([{id: 'cf894144-07a3-494e-b636-aa28e2fa9074', name: 'Tiago', password: '122333', roles: [{id: '', name: 'admin'}]},
        {id: 'df894144-07a3-494e-b636-aa28e2fa9074', name: 'Diogo', password: '122333', roles: [{id: '', name: 'standard'}]}]);
    }
    delete(id: string): Observable<any> {
      return of();
    }
  }

  class FakeConfirmationService {
    getConfirmation(): Observable<any> {
      return of(true);
    }
    triggerOpen(): void {
    }
  }

  beforeEach(async () => {

    await TestBed.configureTestingModule({
        declarations: [
          UserComponent,
          TableComponent
        ],
        providers: [
          {
            provide: Router,
            useClass: FakeRouter
          },
          {
            provide: UserService,
            useClass: FakeUserService
          },
          {
            provide: ConfirmationService,
            useClass: FakeConfirmationService
          }
        ]
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(UserComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });
  });

  it('should create the user component', () => {
    expect(component).toBeTruthy();
  });

  it('should have Tiago and Diogo in the table', () => {
    fixture.detectChanges();
    const content = el.querySelector('#users-table');
    expect(content?.textContent).toContain('Tiago');
    expect(content?.textContent).toContain('Diogo');
  });

  it('should sort names accordingly in the table', () => {
    fixture.detectChanges();
    component.orderUsersByName();
    expect(component.users[0].name).toEqual('Diogo');
    expect(component.users[1].name).toEqual('Tiago');
  });

  it('should navigate to user add page',
    inject([Router], (injectService: Router) => {
      spyOn(injectService, 'navigate');
      fixture.detectChanges();
      component.addUser();
      expect(injectService.navigate).toHaveBeenCalledWith(['/user/add']);
    })
  );

  it('should navigate to user edit page',
  inject([Router], (injectService: Router) => {
    spyOn(injectService, 'navigate');
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelectorAll('a.table-button-edit')[1].click();
    fixture.detectChanges();
    expect(injectService.navigate).toHaveBeenCalledWith(['/user/edit/Diogo']);
  }));

  it('should remove user',
  inject([UserService], (injectService: UserService) => {
    spyOn(injectService, 'delete').and.returnValue(new Observable((observer => {
      observer.next();
      observer.complete();
    })));
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelectorAll('a.table-button-remove')[0].click();
    fixture.detectChanges();
    expect(injectService.delete).toHaveBeenCalledWith(jasmine.any(String));
  }));
});
