import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LaunchesListComponent } from 'src/components/launches-list/launches-list.component';
import { RocketDetailComponent } from 'src/components/rocket-detail/rocket-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: LaunchesListComponent },
  { path: 'detail/:id', component: RocketDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
