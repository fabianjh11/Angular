import { Component, Input, Output, OnChanges, OnInit, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hangman-display',
  templateUrl: './hangman-display.component.html',
  styleUrls: ['./hangman-display.component.css']
})
export class HangmanDisplayComponent implements OnInit, OnChanges {
  @Input() guesses: string[] = [];
  @Input() question: string = '';
  @Output() gameFinished = new EventEmitter<boolean>();
  MAX_MISTAKES = 10;
  mistakesRemaining;
  success: boolean = false;
  constructor() {
    this.mistakesRemaining = this.MAX_MISTAKES;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.['question']?.currentValue && changes?.['question'].currentValue !== changes?.['question'].previousValue) {
      this.mistakesRemaining = this.MAX_MISTAKES;
      this.success = false;
    }
    const guessesCV = changes?.['guesses']?.currentValue;
    if (guessesCV && guessesCV.length && guessesCV !== changes['guesses'].previousValue) {
      const char = [...guessesCV].pop();
      this.checkGuess(char);
    }
  }

  ngOnInit(): void {
  }

  checkGuess(letter: string) {
    if(this.success){
      return;
    }
    let win = true;
    this.mistakesRemaining -= this.mistake(letter);
    for(let i = 0; i < this.question.length; i++) {
      if(!this.guesses.find((guess) => guess.toLowerCase() === this.question[i].toLowerCase())) {
        win = false;
        break;
      }
    }
    this.success = win;
    if(this.success || this.mistakesRemaining === 0) {
      this.gameFinished.emit(this.success);
    }
  }

  mistake(letter: string) {
    for(let i = 0; i < this.question.length; i++){
      if(this.question[i].toLowerCase() === letter.toLowerCase()){
        return 0;
      }
    }
    return 1;
  }
}
