import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';

import { HomeComponent } from './components/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { claims: ['admin', 'standard'] },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
