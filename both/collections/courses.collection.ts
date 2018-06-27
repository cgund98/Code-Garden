import { Meteor } from 'meteor/meteor';
import { MongoObservable } from 'meteor-rxjs';

import { Course } from '../models/course.model';

export const Courses = new MongoObservable.Collection<Course>('courses');

if (Meteor.isServer) {
    Meteor.publish('courses', function coursesPublication() {
        return Courses.find();
    });
}
