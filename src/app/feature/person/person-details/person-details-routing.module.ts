import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonDetailsComponent } from './person-details.component';

const routes: Routes = [
  {
    path: '',
    component: PersonDetailsComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonDetailsRoutingModule {}
