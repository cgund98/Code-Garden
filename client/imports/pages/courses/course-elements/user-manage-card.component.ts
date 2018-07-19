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
        // console.log(this.role.value);
    }

    public refreshUsers() {
        this.onUserChange.emit();
    }

    async remove() {
        try {
            await Meteor.callPromise('roles.removeFromCourse', {
                targetUserId: this.userObj._id,
                course: this._course_id,
            })
            this.refreshUsers();
        } catch (err) {this.error = err.reason}
    }

    async changeRole() {
        // if (this.role.value !== this.prevRole) {return;}
        if (this.role.value === "student") {
            try {
                await Meteor.callPromise('roles.setStudent', {
                	targetUserId: this.userObj._id,
                	course: this._course_id,
                });
                if (this.prevRole == "owner" || this.prevRole == "admin") {this.refreshUsers();}
                this.prevRole = this.role.value;
                // console.log("role changed", this.role.value);
                this.refreshUsers();
            } catch(err) {
                this.role.setValue(this.prevRole);
                this.error = err.reason;
            }
        } else if (this.role.value === "admin") {
            try {
                await Meteor.callPromise('roles.setAdmin', {
                	targetUserId: this.userObj._id,
                	course: this._course_id,
                });
                if (this.prevRole == "student") {this.refreshUsers();}
                this.prevRole = this.role.value;
                // console.log("role changed", this.role.value);
            } catch(err) {
                this.role.setValue(this.prevRole);
                this.error = err.reason;
            }
        } else if (this.role.value === "owner") {
            try {
                await Meteor.callPromise('roles.setOwner', {
                	targetUserId: this.userObj._id,
                	course: this._course_id,
                });
                if (this.prevRole == "student") {this.refreshUsers();}
                this.prevRole = this.role.value;
                // console.log("role changed", this.role.value);
                // this.refreshUsers();
            } catch(err) {
                this.role.setValue(this.prevRole);
                this.error = err.reason;
            }
        }
    }

}
