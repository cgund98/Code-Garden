import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { callWithPromise } from '../../helpers/call-with-promise';

// import Quill from 'quill';

import template from './lesson-create-page.component.html';
import { Courses } from '../../../../both/collections/courses.collection';
import { Lessons } from '../../../../both/collections/lessons.collection';
import { LessonSections } from '../../../../both/collections/lesson-sections.collection';
import { SectionProgresses } from '../../../../both/collections/section-progresses.collection';

declare function require(name:string);
var QuillDeltaToHtmlConverter = require('quill-delta-to-html');

@Component({
    selector: 'lesson-create-page',
    template
})

export class LessonCreatePageComponent implements OnInit {
    _course_id: string;
    courseObj: Object;
    title = new FormControl('', [Validators.required, Validators.minLength(3)]);
    course_title: string;
    seqNum: number;
    lessonID: string;
    sectionID: string;
    sectionProgressID: string;
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

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.sectionGroups = [];

        var newSection = new FormGroup ({
            title: new FormControl('', [Validators.required, Validators.minLength(3)]),
            content: new FormControl('', [Validators.required, Validators.minLength(20)]),
            expressions: new FormControl(''),
            outputs: new FormControl(''),
            tasks: new FormControl('', Validators.required),
        })

        newSection.index = 0;
        newSection.close = false;
        this.sectionGroups.push(newSection);

        this.sub = this.route.params.subscribe(params => {
            this._course_id = params['_course_id'];
        })
        this.courseObj = Courses.findOne({_id: this._course_id});
        this.seqNum = Lessons.find({courseID: this._course_id}).fetch().length;
        try {
            this.course_title = this.courseObj.title;
        } catch(err) {}

    }

    test(inp:any) {
        // console.log(inp);
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
        var converter = new QuillDeltaToHtmlConverter(text, {});
        text = converter.convert();
        if (text.length > 20) {
            section.get('content').setErrors(null);
        } else {
            section.get('content').setErrors({incorrect: true});
        }
    }
    quillClick(section) {
        section.get('content').touched = true;
    }

    async submit() {
        if (this.checkValids()) {
            var lessonID = await Meteor.callPromise('lesson.insert', {
                    title: this.title.value,
                    seqNum: this.seqNum,
                    courseID: this._course_id,
                    course: this.course_title});

            console.log('lessonID:' + lessonID);

            for (var i=0; i < this.sectionGroups.length; i++) {
                var group = this.sectionGroups[i];
                console.log(group);
                var sectionID = await Meteor.callPromise('lessonSection.insert', {
                    title: group.value.title,
                    content: group.content,
                    expressions: group.value.expressions,
                    outputs: group.outputs,
                    starterCode: group.starterCode,
                    tasks: group.value.tasks,
                    seqNum: group.index,
                    lessonID});

                console.log('sectionID:' +sectionID);
                var sectionProgressID = await Meteor.callPromise('lessonProgress.insert', {
                    lessonID,
                    sectionID,
                    sectionProgress: 0,
                    seqNum: group.index,
                });

                console.log('Progress created: ' + sectionProgressID);
                if (i === this.sectionGroups.length - 1) {
                    this.router.navigate(['/courses/'+this._course_id]);
                }
            }
            console.log('Created');
            try {
                await lessonID;
            } catch (err) {alert(err)}
        }

    }
}
