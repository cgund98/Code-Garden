import { MongoObservable } from 'meteor-rxjs';

import { Lesson } from '../models/lesson.model';

export const Lessons = new MongoObservable.Collection<Lesson>('lessons');

Meteor.methods({
    'lessons.insert'(courseID, title, course, seqNum) {
        var newLesson = Lessons.insert({ courseID, title, course, seqNum, });
        return newLesson;
    },
});
