import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  URL_PREFIX: string = 'http://localhost:'; 
  PORT: number = 8080; 

  constructor(private httpClient: HttpClient) { }

  fetchMemes(): Observable <any> {

    let url: string = this.URL_PREFIX + this.PORT + '/memes'; 
    return this.httpClient.get(url); 
  }

  patchMeme(id: number, form: any): Observable <any> {

    let url: string = this.URL_PREFIX + this.PORT + '/memes/' + id; 
    return this.httpClient.patch(url, form.value); 
  }
}


