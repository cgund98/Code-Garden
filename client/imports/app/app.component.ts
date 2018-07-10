import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd } from '@angular/router';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { Courses } from '../../../both/collections/courses.collection';
import template from './app.component.html';

@Component({
  selector: 'app',
  template
})
@InjectUser('user')
export class AppComponent implements OnInit, OnDestroy {

    error: string;
    // navigationSubscription;
    constructor(private router: Router, private zone: NgZone) {
     //  this.navigationSubscription = this.router.events.subscribe((e: any) => {
     // // If it is a NavigationEnd event re-initalise the component
     // if (e instanceof NavigationEnd) {
     //       this.ngOnInit();
     //     }
     //   });
    }

    ngOnInit() {
        particlesJS.load('particles-js', '/assets/particles.json', null);
        function checkForData(router) {
            console.log('Checking...');
            if (Meteor.user()) {
            // if (Courses.find({}).fetch().length > 0 && Courses.find({}).fetch().length > 0) {
                // console.log(Courses.find({}).fetch());
                var url = router.url;
                router.navigateByUrl('/create-course', {skipLocationChange: true}).then(()=>
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

ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    // if (this.navigationSubscription) {
    //    this.navigationSubscription.unsubscribe();
    // }
  }

rDash(){
  var self=this;
  this.zone.run(() =>{
    self.router.navigate(['/dashboard']);
  });
}

rLogOut(){
  var self=this;
  Accounts.logout();
  Accounts.onLogout(function() {
    self.router.navigate(['/']);
    //   if (err){
    //     this.error=err;
    //     console.log(err);
    //   } else {
    //   self.router.navigate(['/']);
    // }
  });

}
rLogin(){
  var self=this;
    this.zone.run(() =>{
    self.router.navigate(['/login']);
    });
}
rSignup(){
  var self=this;
    this.zone.run(() =>{
    self.router.navigate(['/signup']);
    });
}


}
// console.log("out ", Meteor.user());
