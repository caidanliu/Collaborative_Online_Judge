import { Component, OnInit , Inject} from '@angular/core';

declare var ace: any;
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any;
  language: string = "Java";
  languages: string[] = ['Java', 'c++', 'Python'];
  defaultContent ={
  	'Java': `public class Example{
  		public static void main(String[] args){
  			//type your Java code here
  		}
  	}`,
  	  'C++': `#include <iostream> 
      using namespace std; 
      int main() { 
    // Type your C++ code here 
     return 0; 
    }`, 
    'Python': `class Solution: 
   def example(): 
       # Write your Python code here`
  }

  constructor(@Inject('collaboration') private collaboration) { }

  ngOnInit() {
  	 //   var editor = ace.edit("editor");
    // editor.setTheme("ace/theme/monokai");
    // editor.getSession().setMode("ace/mode/javascript");
  	// 
  	this.editor = ace.edit ('editor');
  	this.editor.setTheme('ace/theme/eclipse');
  	this.editor.setFontSize(18);
  	this.editor.$blockScrolling = Infinity;
  	// this.editor.getSession().setMode('ace/mode/java'); 
  	// this.editor.setValue(this.defaultContent['Java'])
  	this.resetEditor();
  	this.collaboration.init();
  }

  resetEditor(): void{
  	console.log('Resetting editor');
  	this.editor.getSession().setMode(`ace/mode/${this.language.toLowerCase()}`); 
  	this.editor.setValue(this.defaultContent[this.language])
  }

  setLanguage(language: string){
  	this.language = language;
  	// //add a map for labguage and js file name c++
  	// this.editor.getSession().setMode(`ace/mode/${language.toLowerCase()}`); 
  	// this.editor.setValue(this.defaultContent[language])
  	this.resetEditor();

  }
  

  submit(){
  	console.log('submit');
  	let userCodes = this.editor.getValue();
  	console.log(userCodes);
  }


}
