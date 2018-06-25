import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { routes } from './app.routes';
// import { CollectPageModule } from '../pages/collect/collect-page.module';
// import { AnalyzePageModule } from '../pages/analyze/analyze-page.module';
import { LessonPageModule } from '../pages/lessons/lesson-page.module';
import { CoursePageModule } from '../pages/courses/course-page.module';
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    // CollectPageModule,
    LessonPageModule,
    CoursePageModule,
  ],
  declarations: [
    AppComponent,
  ],

  bootstrap: [
    AppComponent
  ],
  providers: [
  {provide: APP_BASE_HREF, useValue : '/' }
  ]
})

export class AppModule {}