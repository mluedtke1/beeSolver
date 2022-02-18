import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  
  
  constructor(
    private httpClient: HttpClient
  ) { }

  centerLetter: any;
  letters: string = "";
  lettersArray: string[] = [];
  acceptableWords: string[] = [];
  cLetter: string = "";
  letts: string = "";
  dictionary: string[] = [];
  invalidLetters = ['/', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', '.', '1', '0', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


  ngOnInit(): void {
    this.httpClient.get('assets/testDictionary.txt', {responseType: 'text'})
      .subscribe(data => {
        this.dictionary = data.toString().replace(/\r\n/g,'\n').split('\n');
      });
  }

  submit(): void {

    this.letters.split('').forEach(letter=> {
      this.removeLetter(letter.toLowerCase());
    });
    this.removeLetter(this.centerLetter.toLowerCase())
    console.log(this.invalidLetters);
    this.solve(this.centerLetter.toLowerCase(), this.invalidLetters);
    this.invalidLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', '.', '1', '0', '2', '3', '4', '5', '6', '7', '8', '9'];
    this.centerLetter = "";
    this.letters = "";
    this.lettersArray = [];
    this.acceptableWords= [];
  }

  removeLetter(letter: string): void{
    var i = this.invalidLetters.indexOf(letter);
    this.invalidLetters.splice(i, 1);
  }

  acceptable = true;
  solve(centerLetter: string, invalidLetters: string[]): void{
    this.dictionary.forEach(word => {
      if(word.length > 3 && word.length < 20){
        if(word.includes(centerLetter)){
          invalidLetters.forEach(letter => {
            if(word.includes(letter)){
              this.acceptable = false;
            }
          });
        }
        else{this.acceptable = false;}
      }
      else{this.acceptable = false;}
      if(this.acceptable){
        this.acceptableWords.push(word);
      }
      this.acceptable = true;  
    });
    console.log(this.acceptableWords);
  }
  

}
