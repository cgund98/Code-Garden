import { Courses } from '../../both/collections/courses.collection';
Meteor.methods({
    'Courses.create'(course){
        return Courses.collection.insert(course);
        // console.log("Submitted form");
    },

    'Courses.edit'(id, course){
        Courses.collection.update(id, course);
        // console.log("Submitted form");
    },

    'Courses.remove'(id){
        Courses.remove(id);

        // console.log("Deleted");
    }

});

Meteor.publish('courses', function coursesPublication() {
    return Courses.find({});
});
