import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardShowPageComponent } from './dashboard-show-page.component';

import { DASHBOARD_ELEMENTS_DECLARATIONS } from './dashboard-elements';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    DashboardShowPageComponent,
    ...DASHBOARD_ELEMENTS_DECLARATIONS,
  ],
  entryComponents: [
    DashboardShowPageComponent,
  ],
  exports: [
    DashboardShowPageComponent,
  ]
})

export class DashboardPageModule {}
