import { Route } from '@angular/router';

// import { CollectPageComponent } from '../pages/collect/collect-page.component';
// import { AnalyzePageComponent } from '../pages/analyze/analyze-page.component';
import { LessonShowPageComponent } from '../pages/lessons/lesson-show-page.component';
import { CourseShowPageComponent } from '../pages/courses/course-show-page.component';
import { LoginShowPageComponent } from '../pages/login/login-show-page.component';
import { DashboardShowPageComponent } from '../pages/dashboard/dashboard-show-page.component';



export const routes: Route[] = [
	// { path: '/', component: LessonShowPageComponent }
	{ path: 'courses/lesson', component: LessonShowPageComponent },
  // { path: 'lesson', component: DashboardPageComponent },
	// { path: 'courses/lessons/create', component: LessonCreatePageComponent},
  // { path: 'create-lesson', component: LessonCreatePageComponent },
  { path: 'dashboard', component: DashboardShowPageComponent },
  // { path: 'courses', component: CoursesShowPageComponent },
  { path: 'course', component: CourseShowPageComponent },
  // { path: 'create-course', component: CourseCreatePageComponent },
  { path: 'login', component: LoginShowPageComponent },
  // { path: 'signup', component: SignupPageComponent },
];
