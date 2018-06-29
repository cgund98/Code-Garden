import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http/';

import template from './lesson-section.component.html';

import { SectionProgresses } from '../../../../../both/collections/section-progresses.collection';

@Component({
    selector: 'lesson-section',
    template
})

export class LessonSectionComponent implements OnInit {
    text:string = "";
    options:any = {
       // enableBasicAutocompletion: true, // the editor completes the statement when you hit Ctrl + Space
       // enableLiveAutocompletion: true, // the editor completes the statement while you are typing
       showPrintMargin: false, // hides the vertical limiting strip
       maxLines: 10,
       minLines: 10,
       fontSize: "100%" // ensures that the editor fits in the environment
   };
   @Input() sectionObj:any;
   @Input() progressObj:any;
   title: string;
   content: string;
   expressions: any;
   outputs: any;
   tasks: any;
   success:boolean = false;
   ran: boolean = false;

   constructor(private http: HttpClient) {}

   ngOnInit() {
       this.content = this.sectionObj.content;
       this.title = this.sectionObj.title;
       this.expressions = this.sectionObj.expressions ? this.sectionObj.expressions : "";
       this.expressions = this.expressions.split(";");
       this.outputs = this.sectionObj.outputs ? this.sectionObj.outputs : "";
       this.outputs = this.outputs.split(";");
       this.tasks = this.sectionObj.tasks ? this.sectionObj.tasks : "";
       this.tasks = this.tasks.split(";");

       this.outputs = this.outputs.map(function(s) {
           s = s.replace(/"/g,"").trim();
           return s;
       });

       console.log(this.progressObj);
   }

   runCode() {
       this.http.post('http://localhost:8080/compile', {
           code: this.text,
           language:"4"
       }).subscribe(
           res => {
               console.log(res);
               this.ran = true;
               var output = res.output.replace("↵", "").trim();
               console.log([output], this.outputs);
               if (this.outputs.includes(output)) {
                   this.success = true;
                   this.progressObj.sectionProgress = 1;
                   SectionProgresses.update(this.progressObj._id, { $set: {
                       sectionProgress: 1,
                   } });
               } else { this.success = false }
           },
           err => {
               console.log(err);
               this.ran = true;
           }
       );
   }

}
