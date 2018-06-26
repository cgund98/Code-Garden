import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this._id = params['_id'];
        })
        this.courseObjs = Courses.findOne({_id: this._id});
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
