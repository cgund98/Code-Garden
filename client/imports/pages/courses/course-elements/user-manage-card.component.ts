import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import template from './user-manage-card.component.html';

@Component({
    selector: 'user-manage-card',
    template
})

export class UserManageCardComponent {
    roles: Array<string> = ["Student", "Admin"];
    role = new FormControl('');
}
