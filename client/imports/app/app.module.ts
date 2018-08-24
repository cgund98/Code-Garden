import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AccountsModule } from 'angular2-meteor-accounts-ui';

import { routes } from './app.routes';
import { LessonPageModule } from '../pages/lessons/lesson-page.module';
import { CoursePageModule } from '../pages/courses/course-page.module';
import { DashboardPageModule } from '../pages/dashboard/dashboard-page.module';
import { UserPageModule } from '../pages/users/user-page.module';
import { MiscCompsModule } from '../pages/misc/misc-comps.module';

import {CourseAuthGuard, PrivateCourseAuthGuard, PublishedCourseAuthGuard} from './auth-guards.service';



@NgModule({
  imports: [
    BrowserModule,
    AccountsModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),

    // CollectPageModule,
    LessonPageModule,
    DashboardPageModule,
    CoursePageModule,
    MiscCompsModule,
    UserPageModule,

  ],
  declarations: [
    AppComponent,
  ],

  bootstrap: [
    AppComponent
  ],
  providers: [
      { provide: APP_BASE_HREF, useValue : '/' },
      CourseAuthGuard,
      PrivateCourseAuthGuard,
      PublishedCourseAuthGuard
  ]
})

export class AppModule {}
