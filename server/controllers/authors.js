var Movie  = require('../models/author').movie
var Review  = require('../models/author').review
var validator = require('./validator')

module.exports = {
    getAllMovies : function(req, res){
        Movie.find({}, function(err, movies){
            if (err){
                console.log("Something went wrong: ", err)
            }
            else {
                res.json({message : "Success", data : movies})
            }
        })
    },

    getAllReviews : function(req, res){
        Review.find({}, function(err, reviews){
            if (err){
                console.log("Something went wrong: ", err)
            }
            else {
                res.json({message : "Success", data : reviews})
            }
        })
    },

    makeNewMovie : function(req, res){
        let errors = validator.validateAddMovie(req.body)
        console.log(errors)
        if (errors.count > 0){
            res.json({message : "Failure", data : errors})
        }
        else {
            let newReview = new Review(
                {reviewer : req.body.name,
                stars : req.body.stars,
                review : req.body.review,
                createdAt : new Date()
            })

            newReview.save(function(err){
                if (err){
                    console.log("Something went wrong: ", err)
                }
                else {
                    let newMovie = new Movie(
                        {title : req.body.title,
                        averageStars : req.body.stars,
                        reviews : [newReview],
                        createdAt : new Date(),
                        updatedAt : new Date()
                        })

                        newMovie.save(function(err){
                            if (err){
                                console.log("Something went wrong: ", err)
                            }
                            else {
                                res.json({message : "Success", data : newMovie})
                            }
                        })
                }
            })
        }
    },
    
    getMovie : function(req, res){
        Movie.find({_id : Object(req.params.id)}, function(err, movie){
            if (err){
                console.log("Something went wrong: ", err)
            }
            else {
                res.json({message : "Success", data : movie})
            }
        })
    },

    addReview : function(req, res){
        let errors = validator.validateAddReview(req.body)
        if (errors.count > 0){
            console.log("You have errors in your form ", errors)
            res.json({message : "Failure", data : errors})
        }
        else {
            let newReview = new Review(
                {reviewer : req.body.name,
                stars : req.body.stars,
                review : req.body.review,
                createdAt : new Date()
            })

            newReview.save(function(err){
                if (err){
                    console.log("Something went wrong: ", err)
                }
                else {
                    Movie.find({_id : Object(req.body.id)}, function(err, movie){
                        if (err){
                            console.log("Something went wrong: ", err)
                        }
                        else {

                            // console.log(req.body.id)
                            // console.log(movie)
        
                            var newAvg = addToAverageStars(movie, newReview.stars)
                            Movie.update({_id : Object(req.body.id)}, {$push : {reviews : newReview}, $set : {averageStars : newAvg}}, function(err){
                                if (err){
                                    console.log("Something went wrong: ", err)
                                }
                                else {
                                    res.json({message : "Success"})
                                }
                            })
                        }
                    })
                }
            })

            
        }
    },

    deleteReview : function(req, res){

        console.log(req.params.review_id)
        id = String(req.params.review_id)
        console.log(id)
        Review.remove({_id : Object(req.params.review_id)}, function(err, review){
            if (err){
                console.log("Something went wrong: ", err)
            }

            else {
                console.log(review)
                Movie.updateOne({_id : Object(req.params.movie_id)}, {$pull : {reviews : {_id : Object(req.params.review_id)}}}, function(err, review){
                    if (err){
                        console.log("Something went wrong: ", err)
                    }
                    else {
                        Movie.findOne({_id : Object(req.params.movie_id)}, function(err, movie){
                            if (err){
                                console.log("Something went wrong: ", err)
                            }

                            else {
                                var newAvg = subtractFromAverageStars(movie)
                                Movie.updateOne({_id : Object(req.params.movie_id)}, {$set : {averageStars : newAvg}}, function(err){
                                    if (err){
                                        console.log("Something went wrong: ", err)
                                    }
                                    else {
                                        res.json({message : "Success", stars : newAvg})
                                    }
                                })
                            }
                        })
                        
                    }
                })
            }
        })
    },

    deleteMovie : function(req, res){
        console.log(req.params.id)
        Movie.remove({_id : Object(req.params.id)}, function(err){
            if (err){
                console.log("Something went wrong: ", err)
            }
            else {
                res.json({message : "Success"})
            }
        })
    },
}


function addToAverageStars(arr, stars){
    
    var movie = arr[0]
    console.log(movie)
    var length = movie.reviews.length + 1
    var sum = stars
    for (var i = 0; i < movie.reviews.length; i++){
        // console.log(movie.reviews.stars)
        sum += movie.reviews[i].stars
    }

    return sum/length
}

function subtractFromAverageStars(movie){
    var length = movie.reviews.length
    if (length == 0){
        return 0
    }
    else {

        var sum = 0
        for (var i = 0; i < movie.reviews.length; i++){
            // console.log(movie.reviews.stars)
            sum += movie.reviews[i].stars
        }
        return sum/length
    }
}