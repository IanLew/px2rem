/*
 * Copyright (c) 2016 liuyang - All rights reserved
 *  
 */

 define(function(require, exports, module) {
     "use strict";
     
     var EditorManager = brackets.getModule("editor/EditorManager"),
         DocumentManager = brackets.getModule("document/DocumentManager");
     
     var UNITS_REGEX = /(\d*\.?\d+)\s?(px)/igm,
		 DOT_REGEX = /^\d+(?:\.\d{0,3})?/,
		 RES_REGEX = /\d+/g;
     
     function convert(editor, base) {
         if(editor) {
			var isSelection = false;
			var selectedText = editor.getSelectedText();
			var selection = editor.getSelection();
			
			var result = parseInt(selectedText)/parseInt(base),
				result = DOT_REGEX.exec(result)[0],
				result = parseFloat(result).toString();
			var match = result.match(RES_REGEX);
			if(match[0] === "0") result = "." + match[1] + "rem";
			else result = result + "rem";
			
			if(selectedText.length > 0) {
				isSelection = true;
			}
			
			var doc = DocumentManager.getCurrentDocument();
			doc.batchOperation(function() {
				if(isSelection) {
					doc.replaceRange(result, selection.start, selection.end);
				} else {
					doc.setText(result);
				} 
			});
		}
     }
     
     function pxToRem(base) {
		var match, start, end;
		var editor = EditorManager.getCurrentFullEditor();
		var pos = editor.getCursorPos();
		var sel = editor.getSelection();
		if(sel.start.line === sel.end.line) {
            var unitRegEx = new RegExp(UNITS_REGEX);
			var cursorLine = editor.document.getLine(pos.line);
            
			do {
				match = unitRegEx.exec(cursorLine);
				if(match) {
					start = match.index;
					end = start + match[0].length;
				}
			} while(match && (pos.ch < start || pos.ch > end));
			if(match) {
				pos.ch = start;
				editor.setSelection(pos, {line: pos.line, ch: end});
                convert(editor, base);
			}  // Missing error prompt.
		}
	}
     
     exports.pxToRem = pxToRem;
});