import { Component, Input, OnInit } from '@angular/core';

import template from './course-card.component.html';

@Component({
  selector: 'course-card',
  template
})

export class CourseCardComponent implements OnInit {
  @Input() _id: string;
  @Input() title: string;
  @Input() author: string;
  @Input() shortDesc: string;
  @Input() date: Date;
  @Input() language: string;
  la: string;

  ngOnInit() {
      this.date = this.date.toDateString().substring(3);
      try {
          this.la = Meteor.settings.public.languages[this.language][2];
      } catch(err) {}
  }
}
