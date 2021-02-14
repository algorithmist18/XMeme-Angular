import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  URL_PREFIX: string = 'http://localhost:'; 
  PORT: number = 8080; 

  constructor(private httpClient: HttpClient) { }

  postMeme(data: any): Observable <any> {

    let url: string = this.URL_PREFIX + this.PORT + '/memes'; 
    console.log(url); 
    return this.httpClient.post(url, data.value); 
    
  }
}
