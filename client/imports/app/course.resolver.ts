import { Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { Courses } from "../../../both/collections/courses.collection";

@Injectable()
export class CourseResolver implements Resolve<any> {
  constructor() {
      Meteor.subscribe("courses");
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    let _id = route.params._course_id;
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function waitForData(router) {
        for (var i=0; i < 200; i++ ) {
            if (Meteor.user()) {return Meteor.user()};
            await sleep(10);
        }
    }

    // return waitForData();
    return {};
  }
}
