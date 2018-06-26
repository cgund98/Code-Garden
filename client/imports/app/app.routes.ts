import { Route } from '@angular/router';

// import { CollectPageComponent } from '../pages/collect/collect-page.component';
// import { AnalyzePageComponent } from '../pages/analyze/analyze-page.component';
import { LessonShowPageComponent } from '../pages/lessons/lesson-show-page.component';

import { CourseShowPageComponent } from '../pages/courses/course-show-page.component';
import { CourseCreatePageComponent } from '../pages/courses/course-create-page.component';

import { LoginShowPageComponent } from '../pages/login/login-show-page.component';
<<<<<<< HEAD
import { DashboardShowPageComponent } from '../pages/dashboard/dashboard-show-page.component';


=======
>>>>>>> e9b8d7dbdaa1df7570aa24ee85cbd2e0933bdf01

export const routes: Route[] = [
	// { path: '/', component: LessonShowPageComponent }
	{ path: 'courses/lesson', component: LessonShowPageComponent },
  // { path: 'lesson', component: DashboardPageComponent },
	// { path: 'courses/lessons/create', component: LessonCreatePageComponent},
  // { path: 'create-lesson', component: LessonCreatePageComponent },
  { path: 'dashboard', component: DashboardShowPageComponent },
  // { path: 'courses', component: CoursesShowPageComponent },
  { path: 'course', component: CourseShowPageComponent },
<<<<<<< HEAD
  // { path: 'create-course', component: CourseCreatePageComponent },
=======
  { path: 'create-course', component: CourseCreatePageComponent },
>>>>>>> e9b8d7dbdaa1df7570aa24ee85cbd2e0933bdf01
  { path: 'login', component: LoginShowPageComponent },
  // { path: 'signup', component: SignupPageComponent },
];
