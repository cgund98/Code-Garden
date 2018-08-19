import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'logout',
    template: '',
})

export class LogoutComponent extends Component {
    constructor(private router: Router) {
        Meteor.logout();
        this.router.navigate(['/courses']);
    }
}
