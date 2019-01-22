import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  allMovies;
  addClicked;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.allMovies = [];
    this.getAllMovies();
    this.addClicked = false;
  }

  getAllMovies(){
    var self = this
    let all = this._httpService.getAllMovies();
    all.subscribe(data => {
      self.allMovies = data['data'];
    });
  }

  // delete(id){
  //   var deletedAuthor = this._httpService.deleteAuthor(id)
  //   deletedAuthor.subscribe(data => {
  //   })
  //   for (var i = 0; i < this.allAuthors.length; i++){
  //     if (this.allAuthors[i]._id == id){
  //       this.allAuthors.splice(i, 1)
  //     }
  //   }
  // }

  add() {
    this.addClicked = !this.addClicked;
  }

}
