import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import KEY_CHARS from 'src/app/constants/keyCharacters';

interface IKey {
  value: string;
  guessed: boolean;
}

@Component({
  selector: 'app-hangman-keyboard',
  templateUrl: './hangman-keyboard.component.html',
  styleUrls: ['./hangman-keyboard.component.css']
})
export class HangmanKeyboardComponent implements OnInit {
  @Input() question = '';
  @Output() keyPressed = new EventEmitter<string>();
  keys: IKey[] = [];
  constructor() {
    this.keys = KEY_CHARS.split('').map((key) => {
      return {
        value: key,
        guessed: false,
      };
    });
  }
  ngOnInit(): void {}

  onKeyClick(key: IKey): void {
    if(key.guessed){
      return;
    }
    key.guessed = true;
    this.keyPressed.emit(key.value);
  }
}
