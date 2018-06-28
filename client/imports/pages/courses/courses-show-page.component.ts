import { Component, OnInit } from '@angular/core';

import template from './courses-show-page.component.html';

import { Courses } from '../../../../both/collections/courses.collection';

@Component({
    selector: 'courses-show-page',
    template,
})

export class CoursesShowPageComponent implements OnInit {
    private sub: any;
    courseObjs: any;

    ngOnInit() {
        this.courseObjs = Courses.find({}).fetch();
        
    }
}
