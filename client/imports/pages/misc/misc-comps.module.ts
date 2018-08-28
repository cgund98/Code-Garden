import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NotFoundPageComponent } from './not-found-page.component';

import { MISC_ELEMENTS_DECLARATIONS } from './';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    NotFoundPageComponent,
    ...MISC_ELEMENTS_DECLARATIONS,
  ],
  entryComponents: [
    NotFoundPageComponent,
    ...MISC_ELEMENTS_DECLARATIONS,
  ],
  exports: [
    NotFoundPageComponent,
    ...MISC_ELEMENTS_DECLARATIONS,
  ]
})

export class MiscCompsModule {}
