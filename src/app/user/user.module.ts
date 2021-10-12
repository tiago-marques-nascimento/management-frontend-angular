import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './components/user.component';
import { SharedModule } from '../shared/shared.module';
import { UserManageComponent } from './components/manage/user-manage.component';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    UserComponent,
    UserManageComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    UserService,
    RoleService
  ]
})
export class UserModule { }
