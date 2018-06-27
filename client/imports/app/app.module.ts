import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { routes } from './app.routes';
import { LessonPageModule } from '../pages/lessons/lesson-page.module';
import { CoursePageModule } from '../pages/courses/course-page.module';
import { DashboardPageModule } from '../pages/dashboard/dashboard-page.module';
import { LoginPageModule } from '../pages/login/login-page.module';
import { SignupPageModule } from '../pages/signup/signup-page.module';
import { MiscCompsModule } from '../pages/misc/misc-comps.module';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    // CollectPageModule,
    LessonPageModule,
    DashboardPageModule,
    CoursePageModule,
    MiscCompsModule,
    LoginPageModule,
    SignupPageModule,
  ],
  declarations: [
    AppComponent,
  ],

  bootstrap: [
    AppComponent
  ],
  providers: [
      { provide: APP_BASE_HREF, useValue : '/' },
  ]
})

export class AppModule {}
