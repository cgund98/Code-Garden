import { MongoObservable } from 'meteor-rxjs';

import { Course } from '../models/course.model';

export const Courses = new MongoObservable.Collection<Course>('courses');
