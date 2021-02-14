import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  URL_PREFIX: string = 'https://afternoon-coast-72955.herokuapp.com/'
  PORT: number = 8080; 

  constructor(private httpClient: HttpClient) { }

  fetchMemes(): Observable <any> {

    let url: string = this.URL_PREFIX + '/memes'; 
    return this.httpClient.get(url); 
  }

  patchMeme(id: number, form: any): Observable <any> {

    let url: string = this.URL_PREFIX + '/memes/' + id; 
    return this.httpClient.patch(url, form.value); 
  }
}


