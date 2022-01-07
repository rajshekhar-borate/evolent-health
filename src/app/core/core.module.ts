import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export const MaterialModule = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  imports: [CommonModule, ...MaterialModule],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `CoreModule is aready loaded. Import it in Root module only.`
      );
    }
  }
}
