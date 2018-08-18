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
  @Input() newLesson:boolean = false;
  link: string;

  ngOnInit() {
      this.link = this.newLesson ? "create-lesson" : this.lesson_id;
  }

}
