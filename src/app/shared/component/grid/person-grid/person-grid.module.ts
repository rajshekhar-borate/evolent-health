import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonGridComponent } from './person-grid.component';
import { GridMaterialModules } from '../../../constant/material-modules';

@NgModule({
  imports: [CommonModule, ...GridMaterialModules],
  declarations: [PersonGridComponent],
  exports: [PersonGridComponent],
})
export class PersonGridModule {}
