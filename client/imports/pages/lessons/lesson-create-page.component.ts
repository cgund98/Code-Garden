import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import template from './lesson-create-page.component.html';
import { Courses } from '../../../../both/collections/courses.collection';
import { Lessons } from '../../../../both/collections/lessons.collection';
import { LessonSections } from '../../../../both/collections/lesson-sections.collection';
import { SectionProgresses } from '../../../../both/collections/section-progresses.collection';

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
    private sub: any;
    private newSection: FormGroup;
    private sectionGroups: Array<FormGroup>;

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

        this.sectionGroups.push(newSection);

        this.sub = this.route.params.subscribe(params => {
            this._course_id = params['_course_id'];
        })
        this.courseObj = Courses.findOne({_id: this._course_id});
        this.seqNum = Lessons.find({courseID: this._course_id}).fetch().length + 1;
        try {
            this.course_title = this.courseObj.title;
        } catch(err) {}
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

    submit() {
        if (this.checkValids()) {
            var lessonID = Lessons.collection.insert({
                title: this.title.value,
                seqNum: this.seqNum,
                courseID: this._course_id,
                course: this.course_title,
            });

            for (var i=0; i < this.sectionGroups.length; i++) {
                var group = this.sectionGroups[i];
                var sectionID = LessonSections.collection.insert({
                    title: group.value.title,
                    content: group.value.content,
                    expressions: group.value.expressions,
                    outputs: group.value.outputs,
                    tasks: group.value.tasks,
                    seqNum: group.index,
                    lessonID: lessonID,
                });
                var sectionProgressID = SectionProgresses.collection.insert({
                    seqNum: group.index,
                    lessonID,
                    sectionID,
                    sectionProgress: 0,
                });
                // console.log('Progress created: ' + sectionProgressID);
            }
            console.log('Created');
            this.router.navigate(['/courses/'+this._course_id]);
        }
    }

}
