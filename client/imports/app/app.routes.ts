import { Route, Resolve } from '@angular/router';
import { Injectable } from "@angular/core";

import { LessonShowPageComponent } from '../pages/lessons/lesson-show-page.component';
import { LessonCreatePageComponent } from '../pages/lessons/lesson-create-page.component';
import { LessonEditPageComponent } from '../pages/lessons/lesson-edit-page.component';

import { CourseShowPageComponent } from '../pages/courses/course-show-page.component';
import { CoursesShowPageComponent } from '../pages/courses/courses-show-page.component';
import { CourseCreatePageComponent } from '../pages/courses/course-create-page.component';
import { CourseEditPageComponent } from '../pages/courses/course-edit-page.component';

import { ManageAccountPageComponent } from '../pages/users/manage-account-page.component';
import { LoginPageComponent } from '../pages/users/login-page.component';
import { SignupPageComponent } from '../pages/users/signup-page.component';
import { ForgotPasswordPageComponent } from '../pages/users/forgot-password-page.component';
import { LogoutComponent } from '../pages/users/logout.component';
import { DashboardShowPageComponent } from '../pages/dashboard/dashboard-show-page.component';

import {CourseAuthGuard, PrivateCourseAuthGuard, PublishedCourseAuthGuard } from './auth-guards.service';

export const routes: Route[] = [
    { path: '', component: DashboardShowPageComponent },
    { path: 'dashboard', component: DashboardShowPageComponent },
    { path: 'courses', component: CoursesShowPageComponent},
    { path: 'courses/:_course_id', component: CourseShowPageComponent,
        canActivate: [PrivateCourseAuthGuard, PublishedCourseAuthGuard],
    },
    { path: 'courses/:_course_id/edit', component: CourseEditPageComponent,
        canActivate: [CourseAuthGuard, PublishedCourseAuthGuard]
    },
    { path: 'courses/:_course_id/lessons/:_lesson_id', component: LessonShowPageComponent,
        canActivate: [PrivateCourseAuthGuard, PublishedCourseAuthGuard],
    },
    { path: 'courses/:_course_id/lessons/:_lesson_id/edit', component: LessonEditPageComponent,
        canActivate: [CourseAuthGuard, PublishedCourseAuthGuard]
    },
    { path: 'courses/:_course_id/create-lesson', component: LessonCreatePageComponent,
        canActivate: [CourseAuthGuard, PublishedCourseAuthGuard]
    },
    { path: 'create-course', component: CourseCreatePageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'forgot-password', component: ForgotPasswordPageComponent },
    { path: 'signup', component: SignupPageComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'account', component: ManageAccountPageComponent },

];
