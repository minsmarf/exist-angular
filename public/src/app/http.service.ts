import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    // this.getPokemon();
  }

  getAllMovies() {
    return this._http.get('/allMovies');
  }

  getMovieById(id) {
    return this._http.get('/movie/' + id);
  }

  addReview(obj) {
    return this._http.post('/newReview', obj);
  }


  deleteMovie(id) {
    return this._http.get('/delete/movie/' + id);
  }

  deleteReview(review_id, movie_id) {
    return this._http.get('/delete/review/' + review_id + '/' + movie_id);
  }

  addMovie(obj) {
    return this._http.post('/newMovie', obj);
  }

  getPokemon() {
    let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
    bulbasaur.subscribe(data => {
      console.log('Got the pokemon: ', data)
      let string = data['name']+" is "+data['weight']+" kgs and has the abilites "+data['abilities'][0].ability.name+" and "+data['abilities'][1].ability.name
      console.log(string);
      console.log(data['abilities'][0].ability.url);
      // let url3 = data['abilities'][0].ability.url;
      // let abilities3 = this._http.get(url3);
      // abilities3.subscribe(data => {
      //     console.log('test data here: ',data);
      // });
      let url1 = 'https://pokeapi.co/api/v2/ability/'+data['abilities'][0].ability.name+"/"
      let abilities1 = this._http.get(url1);
      abilities1.subscribe(data => {
        //console.log("Got the ability: ", data)
        let string = "Pokemon that have "+data['name']+" are: "
        for (let x of data['pokemon']) {
          string += x.pokemon.name + ', ';
        }
        console.log(string);
      });
      console.log('abilities:', data['abilities'][1].ability.name);
      console.log('url', url1);
      let url2 = 'https://pokeapi.co/api/v2/ability/'+data['abilities'][1].ability.name+"/"
      let abilities2 = this._http.get(url2);
      abilities2.subscribe(data => {
        //console.log("Got the ability: ", data)
        let string = "Pokemon that have "+data['name']+" are: "
        for(let x of data['pokemon']) {
          string += x.pokemon.name + ', ';
        }
        console.log(string);
      });
    });
  }
}
