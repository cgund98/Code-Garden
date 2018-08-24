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

    enrolledCourseObjs: Array<Course>;
    taughtCourseObjs: Array<Course>;
    p1: number = 1;
    p2: number = 1;

    constructor() {
        Meteor.subscribe("courses");
    }

    ngOnInit() {
        // console.log(Meteor.call('roles.getRolesForUser', {targetUserId: Meteor.userId()}));
        // try {
        //     var courses = Object.keys(Meteor.user().roles);
        //     console.log(courses);
        // } catch (err) {}
        enrolledCourseIDs = Roles.getGroupsForUser(Meteor.user(), "student");
        taughtCourseIDs = Roles.getGroupsForUser(Meteor.user(), "owner");
        taughtCourseIDs.concat(Roles.getGroupsForUser(Meteor.user(), "admin"));
        // console.log(enrolledCourseIDs);
        // console.log(taughtCourseIDs);
        this.enrolledCourseObjs = Courses.find({_id: {"$in": enrolledCourseIDs}, published: true}).fetch();
        this.enrolledCourseObjs = this.enrolledCourseObjs.map(function(c) {
            let author = Meteor.users.findOne({_id: c.authorID})
            c.author = author ? author.profile.name : "??";
            return c;
        });
        this.taughtCourseObjs = Courses.find({_id: {"$in": taughtCourseIDs}}).fetch();
        this.taughtCourseObjs = this.taughtCourseObjs.map(function(c) {
            let author = Meteor.users.findOne({_id: c.authorID})
            c.author = author ? author.profile.name : "??";
            return c;
        });
    }

}
