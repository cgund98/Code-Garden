import { Meteor } from 'meteor/meteor';
import { MongoObservable } from 'meteor-rxjs';

import { Course } from '../models/course.model';

export const Courses = new MongoObservable.Collection<Course>('courses');

if (Meteor.isServer) {
    // Meteor.publish('courses', function coursesPublication() {
    //     return Courses.find();
    // });
}

Meteor.methods({
    'Courses.insert'(title, fullDesc, shortDesc, private, language, authorID, date, createdAt,) {
        return Courses.insert({
            title,
            fullDesc,
            shortDesc,
            private,
            language,
            authorID,
            date,
            createdAt,
        });
    },
});
