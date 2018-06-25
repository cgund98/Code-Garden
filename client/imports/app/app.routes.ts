import { Route } from '@angular/router';

// import { CollectPageComponent } from '../pages/collect/collect-page.component';
// import { AnalyzePageComponent } from '../pages/analyze/analyze-page.component';

export const routes: Route[] = [
	{ path: 'courses/lesson', component: LessonShowPageComponent },
  { path: 'courses/lessons/create', component: LessonCreatePageComponent},
  { path: 'lesson', component: DashboardPageComponent },
  { path: 'create-lesson', component: LessonCreatePageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'courses', component: CoursesShowPageComponent },
  { path: 'course', component: CourseShowPageComponent },
  { path: 'create-course', component: CourseCreatePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
];
