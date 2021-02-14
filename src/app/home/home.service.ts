import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  URL_PREFIX: string = 'https://afternoon-coast-72955.herokuapp.com'; 
  PORT: number = 8080; 

  constructor(private httpClient: HttpClient) { }

  postMeme(data: any): Observable <any> {

    let url: string = this.URL_PREFIX + '/memes'; 
    console.log(url); 
    return this.httpClient.post(url, data.value); 
    
  }
}
