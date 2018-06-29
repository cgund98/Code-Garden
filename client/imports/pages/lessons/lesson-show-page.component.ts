import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import template from './lesson-show-page.component.html';
import { Lessons } from '../../../../both/collections/lessons.collection';
import { LessonSections } from '../../../../both/collections/lesson-sections.collection';

@Component({
  selector: 'lesson-show-page',
  template
})

export class LessonShowPageComponent implements OnInit {
    _lesson_id: string;
    title: string;
    course: string;
    sub: any;
    lessonObj: any;
    sectionObjs: Array<any>;

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this._lesson_id = params['_lesson_id'];
        })
        this.lessonObj = Lessons.findOne({_id: this._lesson_id});
        this.sectionObjs = LessonSections.find({lessonID: this._lesson_id}).fetch();
        try {
            this.title = this.lessonObj.title;
            this.course = this.lessonObj.course;
        } catch(err) {}
    }

}
