import { Route } from '@angular/router';

import { LessonShowPageComponent } from '../pages/lessons/lesson-show-page.component';
import { LessonCreatePageComponent } from '../pages/lessons/lesson-create-page.component';

import { CourseShowPageComponent } from '../pages/courses/course-show-page.component';
import { CoursesShowPageComponent } from '../pages/courses/courses-show-page.component';
import { CourseCreatePageComponent } from '../pages/courses/course-create-page.component';

import { LoginShowPageComponent } from '../pages/login/login-show-page.component';
import { SignupShowPageComponent } from '../pages/signup/signup-show-page.component';
import { DashboardShowPageComponent } from '../pages/dashboard/dashboard-show-page.component';

export const routes: Route[] = [
    { path: 'dashboard', component: DashboardShowPageComponent },
    { path: 'courses', component: CoursesShowPageComponent },
    { path: 'courses/:_course_id', component: CourseShowPageComponent,},
    { path: 'courses/:_course_id/lessons/:_lesson_id', component: LessonShowPageComponent },
    { path: 'courses/:_course_id/create-lesson', component: LessonCreatePageComponent },
    { path: 'create-course', component: CourseCreatePageComponent },
    { path: 'login', component: LoginShowPageComponent },
    { path: 'signup', component: SignupShowPageComponent },

];
