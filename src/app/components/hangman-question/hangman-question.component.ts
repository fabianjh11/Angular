import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hangman-question',
  templateUrl: './hangman-question.component.html',
  styleUrls: ['./hangman-question.component.css']
})
export class HangmanQuestionComponent implements OnInit, OnChanges {
  @Input() question: string = '';
  @Input() guesses: string[] = [];
  characters: { value: string; guessed: boolean }[] = [];
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.['question']?.currentValue &&
      changes?.['question'].currentValue !== changes?.['question'].previousValue
    ) {
      this.characters = this.question
        .split('')
        .map((char) => ({ value: char, guessed: false }));
      this.characters.forEach((char) => {
        if(char.value === ' ' ||
          char.value === '.' ||
          char.value === '/' ||
          char.value === '?' ||
          char.value === '!' ||
          char.value === '-' ||
          char.value === '_' ||
          char.value === '&' ||
          char.value === '$' ||
          char.value === '|' ||
          char.value === '@' ||
          char.value === '~' ||
          char.value === '%' ||
          char.value === 'Á' || char.value === 'Ä' || char.value === 'á' || char.value === 'ä' ||
          char.value === 'É' || char.value === 'Ë' || char.value === 'é' || char.value === 'ë' ||
          char.value === 'Í' || char.value === 'Ï' || char.value === 'í' || char.value === 'ï' ||
          char.value === 'Ó' || char.value === 'Ö' || char.value === 'ó' || char.value === 'ö' ||
          char.value === 'Ú' || char.value === 'Ü' || char.value === 'ú' || char.value === 'ü' ||
          char.value === 'U' || char.value === 'u' ||
          char.value === 'W' || char.value === 'w' ||
          char.value === 'I' || char.value === 'i' ||
          char.value === '\'') {
          char.guessed = true;
          this.guesses.push(char.value);
        }
      });
    }
    const guessesCV = changes?.['guesses']?.currentValue;
    if (
      guessesCV &&
      guessesCV.length &&
      guessesCV !== changes['guesses'].previousValue
    ) {
      const guessedChar = [...changes['guesses'].currentValue].pop();
      this.characters = this.characters.map((char) => {
        if (char.value.toLowerCase() === guessedChar.toLowerCase()) {
          return { ...char, guessed: true };
        }
        return char;
      });
    }
  }

  ngOnInit(): void {}
}
