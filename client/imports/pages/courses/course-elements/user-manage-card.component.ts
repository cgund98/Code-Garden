import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

    @Output() onUserChange: EventEmitter<any> = new EventEmitter<any>();

    roles: Array<string> = ["student", "admin", "owner"];
    role = new FormControl('');
    prevRole: string;
    editing: boolean = false;
    name: string;
    username: string;
    error: string = "";

    ngOnInit() {
        this.name = this.userObj.profile.name;
        this.username = this.userObj.username;
        this.role.setValue(Roles.getRolesForUser(this.userObj, this._course_id)[0]);
        this.prevRole = this.role.value;
        console.log(this.role.value);
    }

    public refreshUsers() {
        this.onUserChange.emit();
    }

    remove() {
        Meteor.call('roles.removeFromCourse', {
            targetUserId: this.userObj._id,
            course: this._course_id,
        }, (err, res) => {
            if (err) {alert(err);} else {
                this.editing = false;
                this.refreshUsers();
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
                  console.log("role changed", this.role.value);
                  this.refreshUsers();
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
                  console.log("role changed", this.role.value);
                  this.refreshUsers();
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
                  console.log("role changed", this.role.value);
                  this.refreshUsers();
              }
            })
        }
    }

}
