import { MongoObservable } from 'meteor-rxjs';

import { LessonSection } from '../models/lesson-section.model';

export const LessonSections = new MongoObservable.Collection<LessonSection>('lesson-sections');

Meteor.methods({
    'lesson-sections.insert'(title,
    content,
    expressions,
    outputs,
    tasks,
    seqNum,
    lessonID,) {
        var newSection = LessonSections.insert({ title,
        content,
        expressions,
        outputs,
        tasks,
        seqNum,
        lessonID,});
        return newSection;
    },
});
