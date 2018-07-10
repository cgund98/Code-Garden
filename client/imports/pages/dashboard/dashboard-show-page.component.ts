import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './dashboard-show-page.component.html';

@Component({
  selector: 'dashboard-show-page',
  template
})

export class DashboardShowPageComponent implements OnInit {

  // user: Meteor.User;
  error:string;

  constructor(private router: Router, private zone: NgZone){

  }
  NgZone() {

  }
  ngOnInit() {
    var user = Meteor.user();
    user;
    // this.user;
  }
}
