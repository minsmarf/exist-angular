import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newMovie;

  constructor(private _httpService: HttpService,
    private _router: Router, private _ngFlash: NgFlashMessageService, private _home : HomeComponent) { }

  ngOnInit() {
    this.newMovie = {title : "", name : "", review : "", stars : ""}
  }

  onSubmit() {

    let newMovie = this._httpService.addMovie(this.newMovie);
    newMovie.subscribe(data => {
      console.log(data);
      if (data['message'] === 'Failure' ) {
        this._ngFlash.showFlashMessage({
          messages : [data['data'].name, data['data'].title, data['data'].stars, data['data'].review]
        });
      } else {
          this._home.addClicked = false;
          this._home.allMovies.push(data['data']);
      }

    });
  }

  cancel() {
    this._home.addClicked = false;
  }

}
