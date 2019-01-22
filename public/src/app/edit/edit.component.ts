import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  currentMovie;
  constructor(private _router: Router, private _route: ActivatedRoute,
    private _httpService: HttpService, private _ngFlash: NgFlashMessageService) { }

  ngOnInit() {
    var self = this
    this.currentMovie = {};
    this._route.params.subscribe((params: Params) => {
      let author = this._httpService.getMovieById(params['id']);
      author.subscribe(data => {
        console.log(data['data'][0]);
        self.currentMovie = data['data'][0];
      });
    });
  }


  delete() {
    // let observer = this._httpService.deleteMovie(this.currentMovie.id)
    console.log(this.currentMovie);
    let observer = this._httpService.deleteMovie(this.currentMovie._id);
    observer.subscribe(data => {
      console.log(data);
    });
    this._router.navigate(['movies']);
  }

  deleteReview(review_id, movie_id) {
    for (var i = 0; i < this.currentMovie.reviews.length; i++) {
      if (this.currentMovie.reviews[i]._id === review_id) {
        this.currentMovie.reviews.splice(i, 1);
      }
    }
    let observer = this._httpService.deleteReview(review_id, movie_id);
    observer.subscribe(data => {
      console.log(data);
      this.currentMovie.averageStars = data['stars'];
    });

  }
}
