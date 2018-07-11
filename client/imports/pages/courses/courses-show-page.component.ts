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

    ngOnInit() {
        this.courseObjs = Courses.find({}).fetch();
        this.courseObjs = this.courseObjs.map(function(c) {
            let author = Meteor.users.findOne({_id: c.authorID})
            c.author = author ? author.profile.name : "??";
            return c;
        });

    }
}
