import { Meteor } from 'meteor/meteor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import template from './course-show-page.component.html';
import { Courses } from '../../../../both/collections/courses.collection';
import { Lessons } from '../../../../both/collections/lessons.collection';

@Component({
  selector: 'course-show-page',
  template
})

export class CourseShowPageComponent implements OnInit {
    _course_id: string;
    title: string;
    fullDesc: string;
    shortDesc: string;
    language: string;
    newLessonLink: string;
    private sub: any;
    private courseObj: any;
    lessonObjs: Array<any>;

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this._course_id = params['_course_id'];
        })
        this.newLessonLink = "/courses/" + this._course_id + "/create-lesson";
        this.courseObj = Courses.findOne({_id: this._course_id});
        this.lessonObjs = Lessons.find({courseID: this._course_id}).fetch();
        console.log(this.lessonObjs);
        try {
            this.title = this.courseObj.title;
            this.fullDesc = this.courseObj.fullDesc;
            this.shortDesc = this.courseObj.shortDesc;
            this.language = this.courseObj.language;
        } catch(err) {}

    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
