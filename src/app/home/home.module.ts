import { NgModule } from '@angular/core';

import { HomeComponent } from './../home/components/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }
