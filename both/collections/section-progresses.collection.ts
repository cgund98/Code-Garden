import { MongoObservable } from 'meteor-rxjs';

import { SectionProgress } from '../models/section-progress.model';

export const SectionProgresses = new MongoObservable.Collection<SectionProgress>('section-progresses');
