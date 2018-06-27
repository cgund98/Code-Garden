import { Component } from '@angular/core';

import template from './lesson-create-page.component.html';

@Component({
    selector: 'lesson-create-page',
    template
})

export class LessonCreatePageComponent {

    addSection(event) {
        event.preventDefault();
        const section = document.getElementsByClassName('section')[0].cloneNode(true);
        section.innerHTML += "<button class='remove' onclick='this.parentNode.parentNode.removeChild(this.parentNode);'><i class='fa fa-times' aria-hidden='true'></i></button>";
        document.getElementsByClassName('lesson-body')[0].appendChild(section);
    }

    

}
