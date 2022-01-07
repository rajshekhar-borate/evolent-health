import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonLookupRoutingModule } from './person-lookup-routing.module';
import { PersonLookupComponent } from './person-lookup.component';

import { FormsModule } from '@angular/forms';
import { PersonGridModule } from '../../../shared/component/grid/person-grid/person-grid.module';
import { PersonLookupService } from './person-lookup.service';
import { LookupAndDetailsMaterialModules } from '../../../shared/constant/material-modules';

@NgModule({
  imports: [
    CommonModule,
    PersonLookupRoutingModule,
    ...LookupAndDetailsMaterialModules,
    FormsModule,
    PersonGridModule,
  ],
  declarations: [PersonLookupComponent],
  providers: [PersonLookupService],
})
export class PersonLookupModule {}
