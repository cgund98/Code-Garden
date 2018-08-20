import { Component, OnInit } from '@angular/core';

import template from './manage-account-page.component.html';

@Component({
    selector: 'manage-account-page',
    template
})

export class ManageAccountPageComponent implements OnInit {

    currentTab: string = "summary";
    user: Meteor.User;
    tabs: Array<string> = ["summary", "name", "username", "password"];

    constructor() {}

    ngOnInit() {
        this.user = Meteor.user();
    }

    changeTab(event) {
        // console.log(event.target.innerHTML);
        this.currentTab = event.target.innerHTML;
    }

}
