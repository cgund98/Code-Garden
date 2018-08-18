import { Route, Resolve } from '@angular/router';
import { Injectable } from "@angular/core";

import { LessonShowPageComponent } from '../pages/lessons/lesson-show-page.component';
import { LessonCreatePageComponent } from '../pages/lessons/lesson-create-page.component';
import { LessonEditPageComponent } from '../pages/lessons/lesson-edit-page.component';

import { CourseShowPageComponent } from '../pages/courses/course-show-page.component';
import { CoursesShowPageComponent } from '../pages/courses/courses-show-page.component';
import { CourseCreatePageComponent } from '../pages/courses/course-create-page.component';
import { CourseEditPageComponent } from '../pages/courses/course-edit-page.component';

import { LoginShowPageComponent } from '../pages/login/login-show-page.component';
import { SignupShowPageComponent } from '../pages/signup/signup-show-page.component';
import { DashboardShowPageComponent } from '../pages/dashboard/dashboard-show-page.component';

import {CourseAuthGuard, PrivateCourseAuthGuard } from './auth-guards.service';

export const routes: Route[] = [
    { path: '', component: DashboardShowPageComponent },
    { path: 'dashboard', component: DashboardShowPageComponent },
    { path: 'courses', component: CoursesShowPageComponent},
    { path: 'courses/:_course_id', component: CourseShowPageComponent, canActivate: [PrivateCourseAuthGuard],
},
    { path: 'courses/:_course_id/edit', component: CourseEditPageComponent, canActivate: [CourseAuthGuard]
},
    { path: 'courses/:_course_id/lessons/:_lesson_id', component: LessonShowPageComponent, canActivate: [PrivateCourseAuthGuard], },
    { path: 'courses/:_course_id/lessons/:_lesson_id/edit', component: LessonEditPageComponent, canActivate: [CourseAuthGuard]
},
    { path: 'courses/:_course_id/create-lesson', component: LessonCreatePageComponent, canActivate: [CourseAuthGuard]
},
    { path: 'create-course', component: CourseCreatePageComponent },
    { path: 'login', component: LoginShowPageComponent },
    { path: 'signup', component: SignupShowPageComponent },

];
