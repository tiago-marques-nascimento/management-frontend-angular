import { NgModule } from '@angular/core';

import { LoginComponent } from './../login/components/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRoutingModule,
    FormsModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
