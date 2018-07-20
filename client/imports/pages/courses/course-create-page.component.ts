import { Meteor } from 'meteor/meteor';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Course } from '../../../../both/models/course.model';
import { Courses } from '../../../../both/collections/courses.collection';

import template from './course-create-page.component.html';

@Component({
    selector: 'course-create-page',
    template
})

export class CourseCreatePageComponent implements OnInit {

    private languages: Array<string>;
    private newCourseForm: FormGroup;
    debug: boolean = false;

    constructor(private router: Router) {}

    ngOnInit() {
        this.languages = ["Javascript", "Java", "C++"]

        this.newCourseForm = new FormGroup ({
            title: new FormControl('', [Validators.required, Validators.minLength(3)]),
            fullDesc: new FormControl('', [Validators.required, Validators.minLength(20)]),
            shortDesc: new FormControl('', [Validators.required, Validators.minLength(10)]),
            private: new FormControl(false),
            language: new FormControl('', Validators.required),
        })

    }

    get title() { return this.newCourseForm.get('title'); }
    get fullDesc() { return this.newCourseForm.get('fullDesc'); }
    get shortDesc() { return this.newCourseForm.get('shortDesc'); }
    get private() { return this.newCourseForm.get('private'); }
    get language() { return this.newCourseForm.get('language'); }

    async submit() {
        if (this.newCourseForm.valid && Meteor.userId()) {
            var course = this.newCourseForm.value;
            course.authorID = Meteor.userId();
            course.createdAt = new Date();
            try {
                let courseID = await Meteor.callPromise('Courses.create', course);
                console.log(courseID)
                await Meteor.callPromise('roles.setOwner', {targetUserId: Meteor.userId(), course: courseID})
                console.log("Submitted form");

                // this.router.navigateByUrl('/').then(()=>
                this.router.navigate(['/courses/' + courseID]);//);
            } catch(err) {alert(err)}
        }
    }


}
