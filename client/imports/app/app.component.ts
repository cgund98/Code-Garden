import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

// import { Courses } from '../../../both/collections/courses.collection';
// import { Lessons } from '../../../both/collections/lessons.collection';

import template from './app.component.html';

declare var particleJS: any;

@Component({
  selector: 'app',
  template
})
export class AppComponent {

    constructor(private router: Router) {
    }

    ngOnInit() {
        particlesJS.load('particles-js', '/assets/particles.json', null);
        function checkForData(router) {
            console.log('Checking...');
            if (Meteor.user()) {
            // if (Courses.find({}).fetch().length > 0 && Courses.find({}).fetch().length > 0) {
                // console.log(Courses.find({}).fetch());
                url = router.url;
                router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                router.navigate([url]));
                return true;
            }
            return false;
        }
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        async function waitForData(router) {
            for (var i=0; i < 200; i++ ) {
                if (checkForData(router)) {return};
                await sleep(10);
            }
        }
        if (Meteor.user() == null) {
            waitForData(this.router);
        }

    }

}
