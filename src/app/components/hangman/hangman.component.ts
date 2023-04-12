import { Component, OnInit } from '@angular/core';
import { HangmanService } from 'src/app/services/hangman.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit {
  question: string = '';
  questions: string[] = [];
  guesses: string[] = [];
  category: string = '';
  restartBtn = false;
  showAnswer = false;
  constructor(private hangmanService: HangmanService) {}
  
  ngOnInit(): void {
    this.hangmanService.getQuestions().subscribe((response) => {
      this.questions = response.items;
      this.category = response.category;
      this.setNewQuestion();
    });
  }

  reset() {
    this.guesses = [];
    this.setNewQuestion();
    this.restartBtn = false;
    this.showAnswer = false;
  }

  setNewQuestion(){
    const index = Math.floor(Math.random() * this.questions.length);
    this.question = this.questions[index];
  }

  guess(letter: string) {
    if(!letter || this.guesses.includes(letter)) {
      return;
    }
    this.guesses = [...this.guesses, letter];
  }

  onGameFinished() {
    for(let i = 0; i < this.question.length; i++) {
      if(!this.guesses.find((guess) => guess.toLowerCase() === this.question[i].toLowerCase())) {
        this.showAnswer = true;
        break;
      }
    }
    this.restartBtn = true;
  }
}
