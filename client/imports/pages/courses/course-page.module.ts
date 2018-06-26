import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CourseShowPageComponent } from './course-show-page.component';
import { COURSE_ELEMENTS_DECLARATIONS } from './course-elements';
import { MiscCompsModule } from '../misc/misc-comps.module';

@NgModule({
  imports: [
    BrowserModule,
    MiscCompsModule,
  ],
  declarations: [
    CourseShowPageComponent,
    ...COURSE_ELEMENTS_DECLARATIONS,
  ],
  entryComponents: [
    CourseShowPageComponent,
  ],
  exports: [
    CourseShowPageComponent,
  ]
})

export class CoursePageModule {}
