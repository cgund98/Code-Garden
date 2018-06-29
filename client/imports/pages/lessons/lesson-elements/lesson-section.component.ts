import { Component, Input, OnInit } from '@angular/core';

import template from './lesson-section.component.html';

@Component({
    selector: 'lesson-section',
    template
})

export class LessonSectionComponent implements OnInit {
    text:string = "var nut;"
    options:any = {
       // enableBasicAutocompletion: true, // the editor completes the statement when you hit Ctrl + Space
       // enableLiveAutocompletion: true, // the editor completes the statement while you are typing
       showPrintMargin: false, // hides the vertical limiting strip
       maxLines: 10,
       minLines: 10,
       fontSize: "100%" // ensures that the editor fits in the environment
   };
   @Input() sectionObj;
   title: string;
   content: string;
   expressions: any;
   outputs: any;
   tasks: any;

   ngOnInit() {
       this.content = this.sectionObj.content;
       this.title = this.sectionObj.title;
       this.expressions = this.sectionObj.expressions ? this.sectionObj.expressions : "";
       this.expressions = this.expressions.split(";");
       this.outputs = this.sectionObj.outputs ? this.sectionObj.outputs : "";
       this.outputs = this.outputs.split(";");
       this.tasks = this.sectionObj.tasks ? this.sectionObj.tasks : "";
       this.tasks = this.tasks.split(";");
   }
}
