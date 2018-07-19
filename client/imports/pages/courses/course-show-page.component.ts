import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import template from './course-show-page.component.html';
import { Courses } from '../../../../both/collections/courses.collection';
import { Lessons } from '../../../../both/collections/lessons.collection';
import { SectionProgresses } from '../../../../both/collections/section-progresses.collection';

import {callWithPromise } from '../../helpers/call-with-promise';

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
    studentObjs: Array<any>;
    adminObjs: Array<any>;
    ownerObjs: Array<any>;

    addingUser: boolean = false;
    newUser = new FormControl('', Validators.required);
    newUserLookup: string = "l";
    roles: Array<string> = ["Student", "Admin"];
    role = new FormControl('', Validators.required);

    isEnrolled: boolean = false;
    isAdmin: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private zone: NgZone) {}

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this._course_id = params['_course_id'];
        });
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

        this.isEnrolled = Roles.userIsInRole(Meteor.userId(), ['student', 'admin', 'owner'], this._course_id);
        this.isAdmin = Roles.userIsInRole(Meteor.userId(), ['admin', 'owner'], this._course_id);

        if (this.isAdmin) {
            this.updateUserArrays();
        }

        try {
            this.title = this.courseObj.title;
            this.fullDesc = this.courseObj.fullDesc;
            this.shortDesc = this.courseObj.shortDesc;
            this.language = this.courseObj.language;
        } catch(err) {}

        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

    }

    enrollSelf() {
        if (!Roles.userIsInRole(Meteor.userId(), ['student', 'admin', 'owner'], this._course_id)) {
            Meteor.call('roles.enroll', {
            	targetUserId: Meteor.userId(),
            	course: this._course_id,
            }, (err, res) => {
              if (err) {
                console.log(err);
              } else {
                // success!
              }
            })
        }
        this.isEnrolled = true;
    }
    addUser() {
        let role = this.role.value.toLowerCase();
        // console.log(role);
        if (!Roles.userIsInRole(this.newUserLookup, ['student', 'admin', 'owner'], this._course_id) && this.newUser.valid && this.role.valid) {
            if (role == "student") {
                // Meteor.call('roles.enroll', {
                // 	targetUserId: this.newUserLookup._id,
                // 	course: this._course_id,
                // }, (err, res) => {
                //   if (err) {
                //     console.log(err);
                // } else {
                //     console.log("Added");
                //     this.updateUserArrays();
                // }})
                // let jimmy = await Meteor.callPromise('roles.enroll', {
                // 	targetUserId: this.newUserLookup._id,
                // 	course: this._course_id,
                // });
                console.log("enrolled");
                this.updateUserArrays();
                this.zone.run(() => {
                    let g = Meteor.callPromise('roles.enroll', {
                    	targetUserId: this.newUserLookup._id,
                    	course: this._course_id,
                    });
                });
                console.log("Waited");
            } else if (role == "admin") {
                Meteor.call('roles.setAdmin', {
                	targetUserId: this.newUserLookup._id,
                	course: this._course_id,
                }, (err, res) => {
                  if (err) {
                    console.log(err);
                  } else {
                      console.log("Added");

                  }
                  this.updateUserArrays();
              })
            }
            console.log("end");
            this.updateUserArrays();
            this.addingUser = false;
            this.role.setValue("");
            this.newUser.setValue("");
        } else if (!Roles.userIsInRole(this.newUserLookup, ['student', 'admin', 'owner'])){
            console.log("They are already enrolled")!
        }
        this.isEnrolled = true;
    }

    userFieldChange() {
        let newUser = this.newUser.value;
        // console.log(newUser);
        let userLookup;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(newUser)) {
            Meteor.call('users.getAccountByEmail', {
            	email: newUser
            }, (err, res) => {
              if (err) {
                alert(err);
              } else {
                this.newUserLookup = res;
              }
          })
      } else {
          let res = Meteor.users.findOne({username: newUser});
          this.newUserLookup = res;
      }
    }

    updateUserArrays() {
        this.studentObjs = Meteor.callPromise('roles.getStudents', { course: this._course_id });
        this.adminObjs = Meteor.callPromise('roles.getAdmins', { course: this._course_id });
        this.ownerObjs = Meteor.callPromise('roles.getOwners', { course: this._course_id });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
