import { Component, Input, OnInit } from '@angular/core';

import template from './course-card.component.html';

@Component({
  selector: 'course-card',
  template
})

export class CourseCardComponent implements OnInit {
  @Input() _id;
  @Input() title;
  @Input() author;
  @Input() shortDesc;
  @Input() date;
  link: string;

  ngOnInit() {
      this.link = "/courses/" + this._id
  }
}
