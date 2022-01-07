import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonLookupComponent } from './person-lookup.component';

const routes: Routes = [
  {
    path: '',
    component: PersonLookupComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonLookupRoutingModule {}
