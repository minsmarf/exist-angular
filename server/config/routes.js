var controller = require('../controllers/authors')
var path = require('path')

module.exports = function(app){
    app.get('/', function(req, res){
        res.sendFile(__dirname + 'index.html')
    })
    
    app.get('/allMovies', function(req, res){
        controller.getAllMovies(req, res)
    })

    app.post('/newMovie', function(req, res){
        controller.makeNewMovie(req, res)
    })

    app.post('/newReview', function(req, res){
        controller.addReview(req, res)
    })

    app.get('/delete/review/:review_id/:movie_id', function(req, res){
        controller.deleteReview(req, res)
    })

    app.get('/movie/:id', function(req, res){
        controller.getMovie(req, res)
    })

    app.get('/delete/movie/:id', function(req, res){
        controller.deleteMovie(req, res)
    })

    app.get('/allReviews', function(req, res){
        controller.getAllReviews(req, res)
    })

    app.all('*', function(req, res){
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    })

}