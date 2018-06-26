import { Component, Input } from '@angular/core';

import template from './course-card.component.html';

@Component({
  selector: 'course-card',
  template
})

export class CourseCardComponent {
  @Input() id;
  @Input() title;
  @Input() author;
  @Input() shortDesc;
  @Input() date;
}
