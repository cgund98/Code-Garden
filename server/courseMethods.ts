import { Courses } from '../both/collections/courses.collection';
Meteor.methods({
    'Courses.create'(course){
        Courses.insert(course);
        console.log("Submitted form");
    }
});
