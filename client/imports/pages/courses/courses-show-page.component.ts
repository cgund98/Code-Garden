import { Meteor } from 'meteor/meteor';
import { Component, OnInit } from '@angular/core';

import template from './courses-show-page.component.html';

import { Courses } from '../../../../both/collections/courses.collection';

@Component({
    selector: 'courses-show-page',
    template,
})

export class CoursesShowPageComponent implements OnInit {
    private sub: any;
    courseObjs: Array<any>;
    p: number = 1;

    constructor() {
        Meteor.subscribe('courses');
    }

    ngOnInit() {
        this.courseObjs = Courses.find({}).fetch();
        this.courseObjs = this.courseObjs.map(function(c) {
            let author = Meteor.users.findOne({_id: c.authorID})
            c.author = author ? author.profile.name : "??";
            c.date = c.createdAt.toDateString().substring(3);
            return c;
        });

    }
}
