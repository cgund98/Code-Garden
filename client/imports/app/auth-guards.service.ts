import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class CourseAuthGuard implements CanActivate {

    constructor(public router: Router) {}

    async canActivate(route: ActivatedRouteSnapshot) {
        // console.log("yeet");
        let hasPerms = await Meteor.callPromise('roles.userHasPerms', {
            targetUserId: Meteor.userId(),
            course: route.params._course_id,
            roles: ["admin", "owner"]
        })
        console.log(hasPerms);
        if (!hasPerms) {
          this.router.navigate(["/courses"]);
          return false;
        }
        return true;
    }
}
