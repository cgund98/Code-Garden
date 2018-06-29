import { Component, Input, OnInit } from '@angular/core';

import template from './lesson-card.component.html';

@Component({
  selector: 'lesson-card',
  template
})

export class LessonCardComponent implements OnInit {
  @Input() title:string;
  @Input() course_id:string;
  @Input() lesson_id:string;
  @Input() icon:string;
  link: string;

  ngOnInit() {
      this.link = "/courses/" + this.course_id + "/lessons/" + this.lesson_id;
  }

}
