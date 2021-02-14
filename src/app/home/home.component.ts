import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Component variables 

  memeForm: FormGroup; 
  displayMessage: string = ''; 

  constructor(private formBuilder: FormBuilder, private router: Router, private homeService: HomeService) { 

    this.memeForm = this.formBuilder.group({
      name: [null, Validators.required],
      caption: [null, Validators.required],
      url: [null, Validators.required]
    });

  }

  ngOnInit(): void {
  }

  postMeme() {

    this.homeService
        .postMeme(this.memeForm)
        .subscribe((response) => {
          console.log(response); 
          localStorage.setItem('name', this.memeForm.get('name')?.value); 
          window.location.reload(); 
        },
        (error) => {
          console.log(error); 
        });
  }

  nameInvalid() {

    let nameControl: any = this.memeForm?.controls.name; 
    return nameControl.touched && nameControl.errors && nameControl.errors.required; 

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
