import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'
import { HttpService } from "../http.service";
import { NgFlashMessageService } from "ng-flash-messages";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  currentMovie
  newReview = {id : '', name : '', stars : '', review : ''}
  constructor(private _router : Router, private _route : ActivatedRoute, private _httpService : HttpService, private _ngFlash : NgFlashMessageService) { }

  ngOnInit() {
    var self = this;
    this.currentMovie = {title : ''};

    this._route.params.subscribe((params: Params) => {
      let movie = this._httpService.getMovieById(params['id']);
      movie.subscribe(data => {
        console.log(data);
        self.currentMovie = data['data'][0];
        self.newReview.id = data['data'][0]._id;
        console.log(self.currentMovie);
      })
    });
  }

  cancel() {
    this._router.navigate(['movies']);
  }

  submit() {
    let observer = this._httpService.addReview(this.newReview);
    observer.subscribe(data => {
      if (data['message'] === 'Failure') {
        console.log(data);
        this._ngFlash.showFlashMessage({
          messages : data['data'][0]['name'] // , data['data'][0]['title'], data['data']['stars'], data['data']['review']
        });
      }      else {
        this._router.navigate(['movies']);
      }
    });
  }

}
