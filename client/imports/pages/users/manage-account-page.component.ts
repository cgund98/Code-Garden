import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import template from './manage-account-page.component.html';

@Component({
    selector: 'manage-account-page',
    template
})

export class ManageAccountPageComponent implements OnInit {

    updateForm: FormData;
    currentTab: string = "summary";
    user: Meteor.User;
    userLookup: Meteor.User;
    tabs: Array<string> = ["summary", "name", "username", "password"];

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.user = Meteor.user();
        this.updateForm = this.formBuilder.group({
            email: ['', Validators.required, Validators.email],
            name: ['', Validators.required],
            username: ['', Validators.required],
        });
    }

    changeTab(event) {
        // console.log(event.target.innerHTML);
        this.currentTab = event.target.innerHTML;
        this.userLookup = null;
    }

    async updateName() {
        if (this.updateForm.get('name').valid) {
            await Meteor.callPromise('user.updateName', {name: this.updateForm.value.name});
            this.user = Meteor.user();
        }
    }
    async updateName() {
        if (this.updateForm.get('name').valid) {
            await Meteor.callPromise('user.updateName', {name: this.updateForm.value.name});
            this.user = Meteor.user();
        }
    }
    async updateUsername() {
        this.userLookup = Meteor.users.findOne({username: this.updateForm.value.username});
        if (this.updateForm.get('username').valid && !this.userLookup) {
            await Meteor.callPromise('user.updateUsername', {username: this.updateForm.value.username});
            this.user = Meteor.user();
        }
    }

}
