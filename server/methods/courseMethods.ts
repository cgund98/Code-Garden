import { Courses } from '../../both/collections/courses.collection';
Meteor.methods({
    'Courses.create'(course){
        return Courses.collection.insert(course);
        // console.log("Submitted form");
    },

    'Courses.edit'({id, course}){
        console.log(course);
        Courses.collection.update(id, course);
        // console.log("Submitted form");
    },

    'Courses.remove'(id){
        Courses.remove(id);
    },
    'Courses.publish'(id){
        let yeet = Courses.collection.update(id, {$set: {"published": true}});
    },
    'Courses.unpublish'(id){
        Courses.collection.update(id, {$set: {"published": false}});
    }

});

Meteor.publish('courses', function coursesPublication() {
    return Courses.find({});
});
