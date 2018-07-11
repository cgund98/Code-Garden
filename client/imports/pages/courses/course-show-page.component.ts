import { Meteor } from 'meteor/meteor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import template from './course-show-page.component.html';
import { Courses } from '../../../../both/collections/courses.collection';
import { Lessons } from '../../../../both/collections/lessons.collection';
import { SectionProgresses } from '../../../../both/collections/section-progresses.collection';

@Component({
  selector: 'course-show-page',
  template
})

export class CourseShowPageComponent implements OnInit {
    _course_id: string;
    title: string;
    fullDesc: string;
    shortDesc: string;
    language: string;
    newLessonLink: string;
    editLink: string;
    private sub: any;
    private courseObj: any;
    lessonObjs: Array<any>;
    newUser = new FormControl('', Validators.required);
    roles: Array<string> = ["Student", "Admin"];
    role = new FormControl('', Validators.required);

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this._course_id = params['_course_id'];
        })
        this.newLessonLink = "/courses/" + this._course_id + "/create-lesson";
        this.editLink = "/courses/" + this._course_id + "/edit";
        this.courseObj = Courses.findOne({_id: this._course_id});
        this.lessonObjs = Lessons.find({courseID: this._course_id}, {sort: {seqNum: 1}}).fetch();
        // console.log(this.lessonObjs);

        for (var i=0; i < this.lessonObjs.length; i++ ) {
            var lessonID = this.lessonObjs[i]._id;
            var progressObjs = SectionProgresses.find({lessonID: lessonID}).fetch();
            var complete = true;
            for (var j=0; j < progressObjs.length; j++) {
                if (progressObjs[j].sectionProgress < 1) {
                    complete = false;
                    break;
                }
            }
            this.lessonObjs[i].icon = complete ? "fa-check" : "fa-unlock";
        }

        try {
            this.title = this.courseObj.title;
            this.fullDesc = this.courseObj.fullDesc;
            this.shortDesc = this.courseObj.shortDesc;
            this.language = this.courseObj.language;
        } catch(err) {}

    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
