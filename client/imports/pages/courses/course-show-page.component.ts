import { Meteor } from 'meteor/meteor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import template from './course-show-page.component.html';
import { Courses } from '../../../../both/collections/courses.collection';

@Component({
  selector: 'course-show-page',
  template
})

export class CourseShowPageComponent implements OnInit {
    _id: string;
    private sub: any;
    private courseObj: Object;

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this._id = params['_id'];
        })
        this.courseObj = Courses.findOne({_id: this._id});
        try {
            this.title = this.courseObj.title;
            this.fullDesc = this.courseObj.fullDesc;
            this.shortDesc = this.courseObj.shortDesc;
        } catch(err) {}

    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
