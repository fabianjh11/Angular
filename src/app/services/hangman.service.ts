import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

const defautlJSON = '../../assets/artists.json';

@Injectable({
  providedIn: 'root'
})
export class HangmanService {

  constructor(private http: HttpClient) { }

  getQuestions(jsonPath: string = defautlJSON) {
    return this.http.get<{category: string, items: string[]}>(defautlJSON);
  }
}
