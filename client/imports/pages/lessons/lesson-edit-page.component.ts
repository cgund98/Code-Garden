import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import Quill from 'quill';

import template from './lesson-edit-page.component.html';
import { Courses } from '../../../../both/collections/courses.collection';
import { Lessons } from '../../../../both/collections/lessons.collection';
import { LessonSection } from '../../../../both/models/lesson-section.model';
import { LessonSections } from '../../../../both/collections/lesson-sections.collection';
import { SectionProgresses } from '../../../../both/collections/section-progresses.collection';

declare function require(name:string);
var QuillDeltaToHtmlConverter = require('quill-delta-to-html');

@Component({
    selector: 'lesson-edit-page',
    template
})

export class LessonEditPageComponent implements OnInit {
    _course_id: string;
    _lesson_id: string;
    courseObj: Object;
    lessonObj: Object;
    sectionObjs: Array<LessonSection>;
    title: FormControl;
    course_title: string;
    seqNum: number;
    private sub: any;
    private newSection: FormGroup;
    private sectionGroups: Array<FormGroup>;
    // @ViewChild('editor') editor: QuillEditorComponent;
    options:any = {
       // enableBasicAutocompletion: true, // the editor completes the statement when you hit Ctrl + Space
       // enableLiveAutocompletion: true, // the editor completes the statement while you are typing
       showPrintMargin: false, // hides the vertical limiting strip
       showGutter: false,
       maxLines: 10,
       minLines: 10,
       fontSize: "100%" // ensures that the editor fits in the environment
   };

    constructor(private route: ActivatedRoute, private router: Router) {
        Meteor.subscribe('courses');
        Meteor.subscribe('lessons');
        Meteor.subscribe('lessonSections');
        Meteor.subscribe('sectionProgresses');
    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this._course_id = params['_course_id'];
            this._lesson_id = params['_lesson_id'];
        })

        this.sectionObjs = LessonSections.find({ lessonID: this._lesson_id }, {sort: {seqNum: 1}}).fetch();
        this.lessonObj = Lessons.findOne({ _id: this._lesson_id });
        this.sectionGroups = [];
        try {
            this.title = new FormControl(this.lessonObj.title, [Validators.required, Validators.minLength(3)])
        } catch(err) {
            this.title = new FormControl('', [Validators.required, Validators.minLength(3)])
        }

        for (var i=0; i < this.sectionObjs.length; i++) {
            var section = this.sectionObjs[i];
            var newSection = new FormGroup ({
                title: new FormControl(section.title, [Validators.required, Validators.minLength(3)]),
                content: new FormControl('yeet', [Validators.required]),
                expressions: new FormControl(section.expressions),
                outputs: new FormControl(section.outputs),
                tasks: new FormControl(section.tasks, Validators.required),
            })

            newSection.index = section.seqNum;
            newSection.close = section.seqNum !== 0;
            newSection.starterCode = section.starterCode;
            newSection.outputs = section.outputs;
            newSection.content = section.content;
            newSection._id = section._id;

            let text = section.content;
            var converter = new QuillDeltaToHtmlConverter(text, {});
            text = converter.convert();
            if (text.length > 20) {
                newSection.get('content').setErrors(null);
            } else {
                newSection.get('content').setErrors({incorrect: true});
            }

            this.sectionGroups.push(newSection);
        }

        this.courseObj = Courses.findOne({_id: this._course_id});
        this.seqNum = Lessons.find({courseID: this._course_id}).fetch().length;
        try {
            this.course_title = this.courseObj.title;
        } catch(err) {}

    }

    test(inp:any) {
        console.log(inp);
    }

    addSection(event) {
        event.preventDefault();
        var newSection = new FormGroup ({
            title: new FormControl('', [Validators.required, Validators.minLength(3)]),
            content: new FormControl('', [Validators.required, Validators.minLength(20)]),
            expressions: new FormControl(''),
            outputs: new FormControl(''),
            tasks: new FormControl('', Validators.required),
        })
        newSection.close = true;
        newSection.index = this.sectionGroups.length;
        this.sectionGroups.push(newSection);
    }

    removeSection(event, index) {
        event.preventDefault();
        this.sectionGroups.splice(index, 1);
        for (var i=index; i < this.sectionGroups.length; i++) {
            this.sectionGroups[i].index -= 1;
        }
    }

    checkValids() {
        for (var i=0; i < this.sectionGroups.length; i++) {
            if (this.sectionGroups[i].invalid) {
                return false;
            }
        }
        if (this.title.invalid) { return false }
        return true;
    }

    contentChange(text: any, section: any) {
        section.content = text;
        let converter = new QuillDeltaToHtmlConverter(text, {});
        text = converter.convert();
        if (text.length > 20) {
            section.get('content').setErrors(null);
        } else {
            section.get('content').setErrors({incorrect: true});
        }
    }
    quillClick(section) {
        section.get('content').touched = true;
        let text = section.content;
        var converter = new QuillDeltaToHtmlConverter(text, {});
        text = converter.convert();
        if (text.length > 20) {
            section.get('content').setErrors(null);
        } else {
            section.get('content').setErrors({incorrect: true});
        }
    }

    async submit() {
        if (this.checkValids()) {
            var lessonID = this._lesson_id;
            await Meteor.callPromise('lesson.update', {
                lessonID,
                lessonObj: {
                    title: this.title.value,
                    seqNum: this.seqNum,
                    courseID: this._course_id,
                    course: this.course_title}
            });
            // Lessons.collection.update(lessonID, {
            //     title: this.title.value,
            //     seqNum: this.seqNum,
            //     courseID: this._course_id,
            //     course: this.course_title,
            // });

            for (var i=0; i < this.sectionGroups.length; i++) {
                var group = this.sectionGroups[i];
                var _id = group._id;
                if (group._id) {
                    // console.log(group.text);
                    await Meteor.callPromise('lessonSection.update', {
                    id: _id,
                    sectionObj: {
                        title: group.value.title,
                        content: group.content,
                        expressions: group.value.expressions,
                        outputs: group.outputs,
                        starterCode: group.starterCode,
                        tasks: group.value.tasks,
                        seqNum: group.index,
                        lessonID}});
                //     // LessonSections.collection.update(this.sectionObjs[i]._id, {
                //     //     title: group.value.title,
                //     //     content: group.content,
                //     //     expressions: group.value.expressions,
                //     //     outputs: group.outputs,
                //     //     starterCode: group.starterCode,
                //     //     tasks: group.value.tasks,
                //     //     seqNum: group.index,
                //     //     lessonID: lessonID,
                //     // });
                // } else {
                //     await Meteor.callPromise('lessonSection.insert', {group.value.title, group.content, group.value.expressions, group.outputs, group.starterCode, group.value.tasks, group.index, lessonID});
                }
            }
            // console.log('Edited');
            this.router.navigate(['/courses/'+ this._course_id + '/lessons/' + this._lesson_id]);
        }
    }

    async deleteLesson() {
        confirm = window.confirm("Are you sure you want to delete the lesson?");
        if (confirm) {
            for (let s of this.sectionObjs) {
                await Meteor.callPromise('lessonSection.remove', s._id);
            }
            for (let p of SectionProgresses.find({lessonID: this._lesson_id}).fetch()) {
                await Meteor.callPromise('lessonSection.progressRemove', p._id);
            }
            laterLesssons = Lessons.find({courseID: this._course_id}, {sort: {seqNum: 1}}).fetch().splice(this.lessonObj.seqNum);
            for (l of laterLesssons) {
                l.seqNum = l.seqNum - 1;
                await Meteor.callPromise('lesson.update', {lessonID: l._id, lessonObj: l});
            }
            await Meteor.callPromise('lesson.remove',this._lesson_id);

            this.router.navigate(['/courses/'+ this._course_id])
        }
    }

}
