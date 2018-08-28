import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Course } from '../../../../both/models/course.model';
import { Courses } from '../../../../both/collections/courses.collection';

import template from './dashboard-show-page.component.html';

@Component({
  selector: 'dashboard-show-page',
  template
})

export class DashboardShowPageComponent implements OnInit {

    enrolledCourseObjs: Array<Course> = [];
    taughtCourseObjs: Array<Course> = [];
    p1: number = 1;
    p2: number = 1;
    sub: any;

    constructor(private router: Router) {
        this.sub = Meteor.subscribe("courses");
    }

    ngOnInit() {
        Tracker.autorun(() => {
            if (this.sub.ready() && !Meteor.user()) {
                this.router.navigate(["/login"]);
            }
        })
        this.populateCourses();
    }

    async populateCourses() {
        enrolledCourseIDs = Roles.getGroupsForUser(Meteor.user(), "student");
        taughtCourseIDs = Roles.getGroupsForUser(Meteor.user(), "owner");
        taughtCourseIDs.concat(Roles.getGroupsForUser(Meteor.user(), "admin"));

        this.taughtCourseObjs = Courses.find({_id: {"$in": taughtCourseIDs}}).fetch();
        for (let c of this.taughtCourseObjs) {
            let author = await Meteor.callPromise('user.getName', c.authorID);
            c.author = author ? author : "??";
        }

        this.enrolledCourseObjs = Courses.find({_id: {"$in": enrolledCourseIDs}, published: true}).fetch();
        for (let c of this.enrolledCourseObjs) {
            let author = await Meteor.callPromise('user.getName', c.authorID);
            c.author = author ? author : "??";
        }
    }

}
