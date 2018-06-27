import { Component, Input, OnInit } from '@angular/core';

import template from './lesson-card.component.html';

@Component({
  selector: 'lesson-card',
  template
})

export class LessonCardComponent implements OnInit {
  @Input() title;
  @Input() course_id;
  @Input() lesson_id;
  link: string;

  ngOnInit() {
      this.link = "/courses/" + this.course_id + "/lessons/" + this.lesson_id;
  }

}
