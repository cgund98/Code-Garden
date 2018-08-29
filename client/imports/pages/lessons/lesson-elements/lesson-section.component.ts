import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http/';

import template from './lesson-section.component.html';

import "brace/mode/java";
import "brace/mode/ruby";
import "brace/mode/c_cpp";
import "brace/mode/php";
import "brace/mode/python";

import { SectionProgresses } from '../../../../../both/collections/section-progresses.collection';

declare function require(name:string);
var QuillDeltaToHtmlConverter = require('quill-delta-to-html');

@Component({
    selector: 'lesson-section',
    template
})

export class LessonSectionComponent implements OnInit {
    editorText:string = "";
    consoleText:string = "";
    editorOptions:any = {
       showPrintMargin: false, // hides the vertical limiting strip
       maxLines: 10,
       minLines: 10,
       fontSize: "100%", // ensures that the editor fits in the environment
   };
   consoleOptions:any = {
      showPrintMargin: false, // hides the vertical limiting strip
      maxLines: 10,
      minLines: 10,
      fontSize: "100%", // ensures that the editor fits in the environment
      showGutter: false,
      highlightActiveLine: false,
      highlightGutterLine: false
  };
   @Input() sectionObj:any;
   @Input() progressObj:any;
   @Input() language:string;
   aceLanguage: string;
   title: string;
   content: string;
   expressions: any;
   outputs: any;
   tasks: any;
   success:boolean = false;
   ran: boolean = false;
   error:string = "";
   @ViewChild('editor') editor;
   @ViewChild('consol') consol;

   constructor(private http: HttpClient) {}

   ngOnInit() {
       // console.log(this.language);
       this.aceLanguage = Meteor.settings.public.languages[this.language][1];
       this.content = this.sectionObj.content;
       this.content = this.procContent(this.content);
       this.title = this.sectionObj.title;
       this.expressions = this.sectionObj.expressions ? this.sectionObj.expressions : "";
       this.expressions = this.expressions.split(";");
       this.outputs = this.sectionObj.outputs ? this.sectionObj.outputs : "";
       this.outputs = this.outputs.split(";");
       this.tasks = this.sectionObj.tasks ? this.sectionObj.tasks : "";
       this.tasks = this.tasks.split(";").filter(task => task.trim() !== "");
       this.editorText = this.sectionObj.starterCode ? this.sectionObj.starterCode : "";

       this.outputs = this.outputs.map(function(s) {
           s = s.replace(/"/g,"").trim();
           return s;
       });

       // console.log(this.progressObj);
   }

   runCode() {
       this.http.post('http://' + window.location.hostname + ':8080/compile', {
           code: this.editorText,
           language: Meteor.settings.public.languages[this.language][0]
       }).subscribe(
           res => {
               // console.log(res);
               this.ran = true;
               var output = res.output.replace("↵", "").trim();
               console.log([output], this.outputs);
               this.consoleText = output;
               if (this.outputs.includes(output)) {
                   this.success = true;
                   this.progressObj.sectionProgress = 1;
                   SectionProgresses.update(this.progressObj._id, { $set: {
                       sectionProgress: 1,
                   } });
               } else {
                   this.error = "Oops, that's not it";
                   this.success = false;
                   // console.log(res);
               }
               this.consoleText = output + res.errors;
           },
           err => {
               // console.log(err);
               this.ran = true;
               if (err.name == "HttpErrorResponse") {
                   this.error = "There was an error on the server side";
               } else {
                   this.error = "Oops, that didn't work.";
                   // this.consoleText = err.nam
               }
           }
       );
   }

   procContent(text) {
        let converter = new QuillDeltaToHtmlConverter(text, {});
        return converter.convert();
    }

}
