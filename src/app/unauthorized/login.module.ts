import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { UnauthorizedComponent } from './components/unauthorized.component';
import { UnauthorizedRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [
    UnauthorizedComponent
  ],
  imports: [
    UnauthorizedRoutingModule,
    FormsModule
  ]
})
export class UnauthorizedModule { }
