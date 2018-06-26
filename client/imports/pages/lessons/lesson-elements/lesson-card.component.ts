import { Component, Input } from '@angular/core';

import template from './lesson-card.component.html';

@Component({
  selector: 'lesson-card',
  template
})

export class LessonCardComponent {
  @Input() title;
}
