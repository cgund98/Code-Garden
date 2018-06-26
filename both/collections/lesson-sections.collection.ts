import { MongoObservable } from 'meteor-rxjs';

import { LessonSection } from '../models/lesson-section.model';

export const LessonSections = new MongoObservable.Collection<LessonSection>('lesson-sections');
