import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';

import template from './quill-editor.component.html';
// import { QuillDeltaToHtmlConverter } from  'quill-delta-to-html';

declare var Quill: any;
declare function require(name:string);
var QuillDeltaToHtmlConverter = require('quill-delta-to-html');

@Component({
    selector: 'quill-editor',
    template
})

export class QuillEditorComponent implements OnInit {

    text:string = "";
    editor: any;
    @ViewChild('editor') editor: ElementRef;
    @Output() onTextChange: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {

        var options = {
            // debug: 'info',
            modules: {
                toolbar: [
                  // [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline'],
                  ['code'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ]
            },
            placeholder: 'Content goes here...*',
            theme: 'snow',
        }
        this.editor = new Quill(this.editor.nativeElement, options);
        this.editor.on('text-change', this.textChange.bind(this));
        }

    public textChange() {
        var text = this.editor.getContents().ops;
        var converter = new QuillDeltaToHtmlConverter(text, {});
        // text = converter.convert();
        console.log(text);
        this.onTextChange.emit(text);
    }

}
