import { Meteor } from 'meteor/meteor';
import { Courses } from '../../both/collections/courses.collection';
import { Lessons } from '../../both/collections/lessons.collection';
import { LessonSections } from '../../both/collections/lesson-sections.collection';
import { SectionProgresses } from '../../both/collections/section-progresses.collection';

Meteor.methods({
// Inserting
    'lesson.insert'(lessonObj){
        return Lessons.collection.insert(lessonObj);
    },

    'lessonSection.insert'(sectionObj){
        return LessonSections.collection.insert(sectionObj);
    },

    'lessonProgress.insert'(progressObj){
        return SectionProgresses.collection.insert(progressObj);
    },

    //Updating

    'lesson.update'({lessonID, lessonObj}){
        Lessons.collection.update(lessonID, lessonObj);
    },

    'lessonSection.update'({id, sectionObj}){
        LessonSections.collection.update(id, sectionObj);
    },

    'lesson.remove'(id){
        Lessons.remove(id);
    },

    'lessonSection.remove'(id){
        LessonSections.remove(id);
    },

    'lessonSection.progressRemove'(id){
        SectionProgresses.remove(id);
    }


});
