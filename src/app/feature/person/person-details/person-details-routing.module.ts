import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonDetailsComponent } from './person-details.component';
import { CanDeactivateGuard } from '../../../core/guard/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: PersonDetailsComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonDetailsRoutingModule {}
