import { Courses } from '../both/collections/courses.collection';
Meteor.methods({
    'Courses.create'(course){
        Courses.insert(course);
        console.log("Submitted form");
    },

    'Courses.edit'(id, course){
        Courses.update(id, course);
        console.log("Submitted form");
    }
    
});
