import { Component, Input, OnInit } from '@angular/core';
import { Roles } from 'meteor/alanning:roles';
import { FormControl } from '@angular/forms';

import template from './user-manage-card.component.html';

@Component({
    selector: 'user-manage-card',
    template
})

export class UserManageCardComponent implements OnInit {
    @Input() userObj: object;
    @Input() _course_id: string;

    roles: Array<string> = ["student", "admin", "owner"];
    role = new FormControl('');
    prevRole: string;
    editing: boolean = false;
    name: string;
    username: string;
    error: string = "";

    remove() {
        Meteor.call('roles.removeFromCourse', {
            targetUserId: this.userObj._id,
            course: this._course_id,
        }, (err, res) => {
            if (err) {alert(err);} else {
                console.log("User removed");
            }
        })
    }

    changeRole() {
        // if (this.role.value !== this.prevRole) {return;}
        if (this.role.value === "student") {
            Meteor.call('roles.setStudent', {
            	targetUserId: this.userObj._id,
            	course: this._course_id,
            }, (err, res) => {
              if (err) {
                  this.role.setValue(this.prevRole);
                  alert(err);
              }
              if (!err) {
                  this.prevRole = this.role.value;
                  console.log("role changed");
              }
            })
        } else if (this.role.value === "admin") {
            Meteor.call('roles.setAdmin', {
            	targetUserId: this.userObj._id,
            	course: this._course_id,
            }, (err, res) => {
              if (err) {
                  this.role.setValue(this.prevRole);
                  alert(err);
              }
              if (!err) {
                  this.prevRole = this.role.value;
                  console.log("role changed");
              }
            })
        } else if (this.role.value === "owner") {
            Meteor.call('roles.setOwner', {
            	targetUserId: this.userObj._id,
            	course: this._course_id,
            }, (err, res) => {
              if (err) {
                  this.role.setValue(this.prevRole);
                  alert(err);
              }
              if (!err) {
                  this.prevRole = this.role.value;
                  console.log("role changed");
              }
            })
        }
    }

    ngOnInit() {
        this.name = this.userObj.profile.name;
        this.username = this.userObj.username;
        this.role.setValue(Roles.getRolesForUser(this.userObj, this._course_id)[0]);
        this.prevRole = this.role.value;
        console.log(this.role.value);
    }

}
