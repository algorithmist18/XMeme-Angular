import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedService } from './feed.service'; 

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  // Component variables 

  memePosts: any[] = []; 
  showEditForm: boolean = false; 
  displayMessage: string = ''; 
  name: string | null = ''; 

  // Meme which needs edit 

  memeId: number = 0; 
  memeForm: FormGroup; 

  constructor(private formBuilder: FormBuilder, private feedService: FeedService, private router: Router) { 

    this.memeForm = this.formBuilder.group({
      caption: [null, Validators.required],
      url: [null, Validators.required]
    });
  }

  ngOnInit(): void {

    // Fetch username 

    this.name = localStorage.getItem('name'); 

    // Fetch names 

    this.fetchMemes(); 

  }

  fetchMemes() {

    // Make a service call 

    this.feedService
        .fetchMemes()
        .subscribe((response) => {
          console.log(response); 
          this.memePosts = JSON.parse(JSON.stringify(response)); 
          console.log(this.memePosts); 
        },
        (error) => {
          this.displayMessage = error.error.message; 
        });
  }

  patchMeme() {

    // Make a service call 

    this.feedService
        .patchMeme(this.memeId, this.memeForm)
        .subscribe((response) => {

          this.showEditForm = false; 
          this.memeId = 0; 

          window.location.reload(); 

        }
        ,
        (error) => {
          console.log(error); 
        });
  }

  editPost(id: number, caption: string, url: string) {

    this.memeId = id; 
    this.showEditForm = true; 

    this.memeForm.setValue({'caption' : caption, 'url': url}); 

  }

  goBack() {

    this.showEditForm = false; 
    this.memeId = 0; 

  }

  goBackToForm() {

    localStorage.removeItem('name'); 

  }

  captionInvalid() {

    let captionControl: any = this.memeForm?.controls.caption; 
    return captionControl.touched && captionControl.errors && captionControl.errors.required; 

  }

  imageUrlInvalid() {

    let imageControl: any = this.memeForm?.controls.url; 
    return imageControl.touched && imageControl.errors && imageControl.errors.required; 

  }

}
