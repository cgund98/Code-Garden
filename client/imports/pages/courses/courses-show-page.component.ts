import { Meteor } from 'meteor/meteor';
import { Component, OnInit } from '@angular/core';

import template from './courses-show-page.component.html';

import { Course } from '../../../../both/models/course.model';
import { Courses } from '../../../../both/collections/courses.collection';

@Component({
    selector: 'courses-show-page',
    template,
})

export class CoursesShowPageComponent implements OnInit {
    private sub: any;
    courseObjs: Array<Course> = [];
    p: number = 1;

    constructor() {
        Meteor.subscribe('courses');
    }

    ngOnInit() {
        this.populateCourses();
    }

    async populateCourses() {
        this.courseObjs = Courses.find({private: false, published: true}).fetch();
        for (let c of this.courseObjs) {
            let author = await Meteor.callPromise('user.getName', c.authorID);
            c.author = author ? author : "??";
        }
    }
}
