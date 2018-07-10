import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import template from './lesson-show-page.component.html';
import { Courses } from '../../../../both/collections/courses.collection';
import { Lessons } from '../../../../both/collections/lessons.collection';
import { LessonSections } from '../../../../both/collections/lesson-sections.collection';
import { SectionProgresses } from '../../../../both/collections/section-progresses.collection';

@Component({
  selector: 'lesson-show-page',
  template
})

export class LessonShowPageComponent implements OnInit {
    _lesson_id: string;
    _course_id: string;
    title: string;
    course: string;
    editLink: string = "#";
    sub: any;
    lessonObj: any;
    sectionObjs: Array<any>;
    progressObjs: Array<any>;
    linkObjs: Array<any> = [];
    toggleNav: boolean = false;

    prevLessonLink: any;
    nextLessonLink: any;

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this._lesson_id = params['_lesson_id'];
            this._course_id = params['_course_id'];
        })
        this.lessonObj = Lessons.findOne({_id: this._lesson_id});
        this.editLink = './' + this._lesson_id + '/edit';
        this.sectionObjs = LessonSections.find({lessonID: this._lesson_id}, {sort: {seqNum: 1}}).fetch();
        this.progressObjs = SectionProgresses.find({lessonID: this._lesson_id}, {sort: {seqNum: 1}}).fetch();

        try {
            let prevLesson = Lessons.findOne({courseID: this._course_id, seqNum: this.lessonObj.seqNum-1});
            this.prevLessonLink = prevLesson ? '/courses/' + this._course_id + '/lessons/' + prevLesson._id : null
            let nextLesson = Lessons.findOne({courseID: this._course_id, seqNum: this.lessonObj.seqNum+1});
            this.nextLessonLink = nextLesson ? '/courses/' + this._course_id + '/lessons/' + nextLesson._id : null
        } catch (err) {}


        for (var i=0; i < this.sectionObjs.length; i++) {
            var link:any = {};
            link.sectionTitle = this.sectionObjs[i].title;
            link.seqNum = this.sectionObjs[i].seqNum;
            switch(this.progressObjs[i].sectionProgress) {
                case 0:
                    link.class = "current";
                    link.icon = "fa-bookmark";
                    break;
                case 1:
                    link.class = "completed";
                    link.icon = "fa-check";
                    break;
            }
            this.linkObjs.push(link);
        }

        try {
            this.title = this.lessonObj.title;
            this.course = this.lessonObj.course;
        } catch(err) {}
    }

}
