import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd } from '@angular/router';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import {enableProdMode} from '@angular/core';

enableProdMode();

import { Courses } from '../../../both/collections/courses.collection';
import template from './app.component.html';

@Component({
  selector: 'app',
  template
})
@InjectUser('user')
export class AppComponent implements OnInit, OnDestroy {

    error: string;
    ready: boolean = false;
    constructor(private router: Router, private zone: NgZone) {}

    ngOnInit() {
        // particlesJS.load('particles-js', '/assets/particles.json', null);
        function checkForData(router) {
            console.log('Checking...');
            if (Meteor.user()) {
                return true;
            }
            return false;
        }
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        async function waitForData(handles) {
            for (var i=0; i < 1000; i++ ) {
                var ready = true;
                Tracker.autorun(() => {
                  handles.map(handle => {
                      if (ready) {ready = handle.ready()}
                      // console.log(ready);
                  })
                });
                if (ready) {return true};
                await sleep(10);
            }
            window.alert("Connection timed out.");
        }
        if (Meteor.user() == null) {
            const cHandle = Meteor.subscribe('courses');
            const lHandle = Meteor.subscribe('lessons');
            const lsHandle = Meteor.subscribe('lessonSections');
            const spHandle = Meteor.subscribe('sectionProgresses');
            this.ready = waitForData([cHandle, lHandle, lsHandle, spHandle]).then(function() {
                var url = this.router.url;
                // console.log(url);
                let navUrl = url == '/' ? '/courses' : '/';
                this.router.navigateByUrl(navUrl, {skipLocationChange: true}).then(()=>
                this.router.navigate([url]));
            }.bind(this));
        }

    }

    ngOnDestroy() {
    }


}
// console.log("out ", Meteor.user());
