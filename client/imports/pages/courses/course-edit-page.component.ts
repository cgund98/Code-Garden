import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Course } from '../../../../both/models/course.model';
import { Courses } from '../../../../both/collections/courses.collection';

import template from './course-edit-page.component.html';

@Component({
    selector: 'course-edit-page',
    template
})

export class CourseEditPageComponent implements OnInit {

    _course_id: string;
    private languages: Array<string>;
    private editCourseForm: FormGroup;
    private course: Course;
    private sub: any;

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.languages = ["HTML", "CSS", "Javascript"];

        this.sub = this.route.params.subscribe(params => {
            this._course_id = params['_course_id'];
        })

        this.course = Courses.findOne({_id: this._course_id})

        this.editCourseForm = new FormGroup ({
            title: new FormControl(this.course.title, [Validators.required, Validators.minLength(3)]),
            fullDesc: new FormControl(this.course.fullDesc, [Validators.required, Validators.minLength(20)]),
            shortDesc: new FormControl(this.course.shortDesc, [Validators.required, Validators.minLength(10)]),
            private: new FormControl(this.course.private),
            language: new FormControl(this.course.language, Validators.required),
        })
    }

    get title() { return this.editCourseForm.get('title'); }
    get fullDesc() { return this.editCourseForm.get('fullDesc'); }
    get shortDesc() { return this.editCourseForm.get('shortDesc'); }
    get private() { return this.editCourseForm.get('private'); }
    get language() { return this.editCourseForm.get('language'); }

    submit() {
        if (this.editCourseForm.valid && this.course) {
            var course = this.editCourseForm.value;
            Courses.update(this._course_id, course);
            console.log("Submitted form");
            this.router.navigateByUrl('/');
        }
    }

}
