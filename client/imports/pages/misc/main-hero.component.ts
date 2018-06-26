import { Component, Input } from '@angular/core';

import template from './main-hero.component.html';

@Component({
  selector: 'main-hero',
  template
})

export class MainHeroComponent {
  @Input() title;
  @Input() subtitle;
}
