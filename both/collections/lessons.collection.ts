import { MongoObservable } from 'meteor-rxjs';

import { Lesson } from '../models/lesson.model';

export const Lessons = new MongoObservable.Collection<Lesson>('lessons');
