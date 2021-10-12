import { CommonModule } from '@angular/common';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CheckboxComponent } from 'src/app/shared/components/checkbox/checkbox.component';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { Role, User } from '../../models/user.model';
import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';
import { UserManageComponent } from './user-manage.component';

describe('UserManageComponent', () => {

  let component: UserManageComponent;
  let fixture: ComponentFixture<UserManageComponent>;
  let el: HTMLElement;

  beforeEach(async () => {

    class FakeRouter {
        url = '/user/add';

        navigate(routes: string[]): Promise<boolean> {
          return new Promise<boolean>((resolve, reject) => {
          });
        }
    }

    class FakeActivatedRoute {
        params = [];
    }

    class FakeUserService {
      find(name: string): Observable<User> {
        return of({id: 'cf894144-07a3-494e-b636-aa28e2fa9074', name: 'Tiago', password: '122333', roles: [{id: 'cf894144-07a3-494e-b636-aa28e2fa9075', name: 'admin'}]});
      }
      save(user: User): Observable<any> {
        return of();
      }
    }

    class FakeRoleService {
        listAll(): Observable<Role[]> {
            return of([{id: 'cf894144-07a3-494e-b636-aa28e2fa9075', name: 'admin'}, {id: 'cf894144-07a3-494e-b636-aa28e2fa9076', name: 'standard'}]);
        }
    }

    await TestBed.configureTestingModule({
        imports: [
            CommonModule,
            FormsModule,
        ],
        declarations: [
          UserManageComponent,
          CheckboxComponent,
        ],
        providers: [
          {
            provide: Router,
            useClass: FakeRouter
          },
          {
            provide: ActivatedRoute,
            useClass: FakeActivatedRoute
          },
          {
            provide: UserService,
            useClass: FakeUserService
          },
          {
            provide: RoleService,
            useClass: FakeRoleService
          }
        ]
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(UserManageComponent);
      component = fixture.componentInstance;
      component.user = {id: '', name: 'Tiago', password: '122333', roles: [{id: '', name: 'admin'}]};
      el = fixture.nativeElement;
    });
  });

  it('should create the user manage component', () => {
    expect(component).toBeTruthy();
  });

  it('should have Tiago on the user name', () => {
    fixture.detectChanges();
    expect(component.user.name).toEqual('Tiago');
  });

  it('should have 122333 on the password', () => {
    fixture.detectChanges();
    expect(component.user.password).toEqual('122333');
  });

  it('should have both the confirm button as well as the return button', () => {
    fixture.detectChanges();
    const content = el.querySelector('#user-buttons');
    expect(content?.textContent).toContain('Confirm');
    expect(content?.textContent).toContain('Return');
  });

  it('should navigate to users page',
  inject([Router], (injectService: Router) => {
    spyOn(injectService, 'navigate');
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#user-return-button').click();
    fixture.detectChanges();
    expect(injectService.navigate).toHaveBeenCalledWith(['/user']);
  }));

  it('should give invalid user name error',
  inject([AlertService], (injectService: AlertService) => {
    spyOn(injectService, 'triggerError').and.returnValue();
    fixture.detectChanges();
    component.user.name = '';
    fixture.debugElement.nativeElement.querySelector('#user-confirm-button').click();
    fixture.detectChanges();
    expect(injectService.triggerError).toHaveBeenCalledWith('Please provide a name');
  }));

  it('should give invalid user password error',
  inject([AlertService], (injectService: AlertService) => {
    spyOn(injectService, 'triggerError').and.returnValue();
    fixture.detectChanges();
    component.user.password = '';
    fixture.debugElement.nativeElement.querySelector('#user-confirm-button').click();
    fixture.detectChanges();
    expect(injectService.triggerError).toHaveBeenCalledWith('Please provide a password');
  }));

  it('should give invalid user roles error',
  inject([AlertService], (injectService: AlertService) => {
    spyOn(injectService, 'triggerError').and.returnValue();
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#user-confirm-button').click();
    fixture.detectChanges();
    expect(injectService.triggerError).toHaveBeenCalledWith('Please select at least one role');
  }));

  it('should save and then navigate to users page',
  inject([Router], (router: Router) => {
    const userService = TestBed.inject(UserService);
    spyOn(router, 'navigate');
    spyOn(userService, 'save').and.returnValue(new Observable((observer => {
      observer.next();
      observer.complete();
    })));
    fixture.detectChanges();
    component.roleCheckboxes[0] = true;
    fixture.debugElement.nativeElement.querySelector('#user-confirm-button').click();
    fixture.detectChanges();
    expect(userService.save).toHaveBeenCalledWith(component.user);
    expect(router.navigate).toHaveBeenCalledWith(['/user']);
  }));
});
