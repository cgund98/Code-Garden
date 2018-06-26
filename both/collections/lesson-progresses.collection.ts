import { MongoObservable } from 'meteor-rxjs';

import { LessonProgress } from '../models/lesson-progress.model';

export const LessonProgresses = new MongoObservable.Collection<LessonProgress>('lesson-progresses');
