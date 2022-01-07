import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDetailsRoutingModule } from './person-details-routing.module';
import { PersonDetailsComponent } from './person-details.component';
import { PersonDetailsService } from './person-details.service';
import { LookupAndDetailsMaterialModules } from '../../../shared/constant/material-modules';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PersonDetailsRoutingModule,
    FormsModule,
    ...LookupAndDetailsMaterialModules,
  ],
  declarations: [PersonDetailsComponent],
  providers: [PersonDetailsService],
})
export class PersonDetailsModule {}
