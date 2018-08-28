import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Courses } from '../../../both/collections/courses.collection';

@Injectable()
export class CourseAuthGuard implements CanActivate {

    constructor(public router: Router) {
        sub = Meteor.subscribe('courses');
    }

    async canActivate(route: ActivatedRouteSnapshot): boolean {
        Tracker.autorun(() => {
            if (!sub.ready()) {
                return true;
            }
        })
        // console.log("yeet");
        let hasPerms = await Meteor.callPromise('roles.userHasPerms', {
            targetUserId: Meteor.userId(),
            course: route.params._course_id,
            roles: ["admin", "owner"]
        })
        // console.log(hasPerms);
        if (!hasPerms) {
          this.router.navigate(["/courses"]);
          return false;
        }
        return true;
    }
}

@Injectable()
export class PrivateCourseAuthGuard implements CanActivate {

    constructor(public router: Router) {
        sub = Meteor.subscribe('courses');
    }

    async canActivate(route: ActivatedRouteSnapshot): boolean {

        Tracker.autorun(() => {
            if (!sub.ready()) {
                return true;
            }
        })
        // console.log("yeet");
        let hasPerms = await Meteor.callPromise('roles.userHasPerms', {
            targetUserId: Meteor.userId(),
            course: route.params._course_id,
            roles: ["admin", "owner", "student"]
        })
        let priv = Courses.findOne({_id: route.params._course_id}).private;
        // console.log(hasPerms);
        if (!hasPerms && priv) {
          this.router.navigate(["/courses"]);
          return false;
        }
        return true;
    }
}

@Injectable()
export class PublishedCourseAuthGuard implements CanActivate {

    constructor(public router: Router) {
        sub = Meteor.subscribe('courses');
    }

    async canActivate(route: ActivatedRouteSnapshot): boolean {
        Tracker.autorun(() => {
            if (!sub.ready()) {
                return true;
            }
        })
        // console.log("yeet");
        let hasPerms = await Meteor.callPromise('roles.userHasPerms', {
            targetUserId: Meteor.userId(),
            course: route.params._course_id,
            roles: ["admin", "owner"]
        })
        let pub = Courses.findOne({_id: route.params._course_id}).published;
        // console.log(hasPerms);
        if (!hasPerms && !pub) {
          this.router.navigate(["/courses"]);
          return false;
        }
        return true;
    }
}
