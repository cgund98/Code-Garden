import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Course } from '../../../../both/models/course.model';
import { Courses } from '../../../../both/collections/courses.collection';
import { Lessons } from '../../../../both/collections/lessons.collection';
import { LessonSections } from '../../../../both/collections/lesson-sections.collection';
import { SectionProgresses } from '../../../../both/collections/section-progresses.collection';

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
    error: string;
    debug: boolean = false;

    constructor(private router: Router, private route: ActivatedRoute) {
        Meteor.subscribe('courses');
        Meteor.subscribe('lessons');
        Meteor.subscribe('lessonSections');
        Meteor.subscribe('sectionProgresses');
    }

    ngOnInit() {
        this.languages = Object.keys(Meteor.settings.public.languages);

        this.sub = this.route.params.subscribe(params => {
            this._course_id = params['_course_id'];
        })

        this.course = Courses.findOne({_id: this._course_id})
        try {
            this.editCourseForm = new FormGroup ({
                title: new FormControl(this.course.title, [Validators.required, Validators.minLength(3)]),
                fullDesc: new FormControl(this.course.fullDesc, [Validators.required, Validators.minLength(20)]),
                shortDesc: new FormControl(this.course.shortDesc, [Validators.required, Validators.minLength(10)]),
                private: new FormControl(this.course.private),
                language: new FormControl(this.course.language, Validators.required),
            })
        } catch(err) {
            this.editCourseForm = new FormGroup ({
                title: new FormControl('', [Validators.required, Validators.minLength(3)]),
                fullDesc: new FormControl('', [Validators.required, Validators.minLength(20)]),
                shortDesc: new FormControl('', [Validators.required, Validators.minLength(10)]),
                private: new FormControl(false),
                language: new FormControl('', Validators.required),
            })
        }
    }
    get title() { return this.editCourseForm.get('title'); }
    get fullDesc() { return this.editCourseForm.get('fullDesc'); }
    get shortDesc() { return this.editCourseForm.get('shortDesc'); }
    get private() { return this.editCourseForm.get('private'); }
    get language() { return this.editCourseForm.get('language'); }

    submit() {
        if (this.editCourseForm.valid && this.course) {
            var course = this.editCourseForm.value;
            Meteor.call('Courses.edit', this._course_id, course);
            this.router.navigateByUrl('/courses/' + this._course_id);
        }
    }

    deleteCourse() {
        let confirm = window.prompt('Are you sure you want to delete this?  If so enter the course title and hit OK.');
        // console.log(this.course.title === confirm);
        if (confirm.toUpperCase() === this.course.title.toUpperCase()) {

            let lessons = Lessons.find({courseID: this._course_id}).fetch();

            for (let l of lessons) {
                for (s of LessonSections.find({lessonID: l._id}).fetch()) {
                    Meteor.call('lessonSection.remove', s._id);
                }
                for (p of SectionProgresses.find({lessonID: l._id}).fetch()) {
                    Meteor.call('lessonSection.progressRemove', p._id);
                }
                // SectionProgresses.remove({lessonID: l._id});
                Meteor.call('lesson.remove', l._id);
            }
            // Lessons.remove({courseID: this._course_id});
            Meteor.call('Courses.remove', this._course_id);
            //Courses.remove({_id: this._course_id});

            console.log("Deleted");
            this.router.navigateByUrl('/courses');


        } else if (confirm == "" ) {
            window.alert("Delete Aborted.");
        } else {
            window.alert("Course title submitted incorrectly");
        }
    }

}
