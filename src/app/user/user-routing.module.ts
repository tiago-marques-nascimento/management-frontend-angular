import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserManageComponent } from './components/manage/user-manage.component';
import { UserComponent } from './components/user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: { claims: ['admin', 'standard'] },
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: UserManageComponent,
    data: { claims: ['admin'] },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:name',
    component: UserManageComponent,
    data: { claims: ['admin'] },
    canActivate: [AuthGuard]
  },
  {
    path: 'view/:name',
    component: UserManageComponent,
    data: { claims: ['admin', 'standard'] },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
