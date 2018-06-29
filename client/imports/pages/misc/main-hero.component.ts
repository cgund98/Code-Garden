import { Component, Input, OnInit } from '@angular/core';

import template from './main-hero.component.html';

declare var particlesJS: any;

@Component({
  selector: 'main-hero',
  template
})

export class MainHeroComponent implements OnInit {
    @Input() title;
    @Input() subtitle;

    ngOnInit() {
        particlesJS.load('particles-js', '/assets/particles.json', null);
    }

}
