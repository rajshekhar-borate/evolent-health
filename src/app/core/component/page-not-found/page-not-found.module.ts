import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [CommonModule, PageNotFoundRoutingModule, MatButtonModule],
  declarations: [PageNotFoundComponent],
})
export class PageNotFoundModule {}
