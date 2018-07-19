import { Meteor } from 'meteor/meteor';
import { Courses } from '../both/collections/courses.collection';
import { Lessons } from '../both/collections/lessons.collection';
import { LessonSections } from '../both/collections/lesson-sections.collection';
import { SectionProgresses } from '../both/collections/section-progresses.collection';

Meteor.methods({
// Inserting
    'lesson.insert'([title, seq, courseID, course]){
        var lsson = Lessons.collection.insert({
            title: title,
            seqNum: seq,
            courseID: courseID,
            course: course,
        });
        console.log("onServer" + lsson);
        return lsson;
    },

    'lessonSection.insert'([title, content, expressions, outputs, starterCode, tasks, index, lessonID]){
        return LessonSections.collection.insert({
            title: title,
            content: content,
            expressions: expressions,
            outputs: outputs,
            starterCode: starterCode,
            tasks: tasks,
            seqNum: index,
            lessonID: lessonID,
        });
    },

    'lessonSection.progress'([index, lessonID, sectionID]){
        return SectionProgresses.collection.insert({
            seqNum: index,
            lessonID,
            sectionID,
            sectionProgress: 0,
        });
    },

    //Updating

    'lesson.update'(lessonID, title, seqNum, courseID, course){
        Lessons.collection.update(lessonID, {
            title: title,
            seqNum: seqNum,
            courseID: courseID,
            course: course,
        });
    },

    'lessonSection.update'(id, title, content, expressions, outputs, starterCode, tasks, seqNum, lessonID){
        LessonSections.collection.update(id, {
            title: title,
            content: content,
            expressions: expressions,
            outputs: outputs,
            starterCode: starterCode,
            tasks: tasks,
            seqNum: index,
            lessonID: lessonID,
        });
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
