var validator = require('validator')

module.exports = {
    validateAddMovie : function(postData){
        var errors = {}
        if (postData.name.length == 0){
            errors.name = 'Name cannot be empty'
        }
        else if (postData.name.length < 3) {
            errors.name = 'Name must be greater than 3 characters'
        }

        if (!postData.stars){
            errors.stars = 'Stars cannot be empty'
        }

        if (postData.title.length == 0){
            errors.title = 'Title cannot be empty'
        }
        else if (postData.title.length < 3) {
            errors.title = 'Title must be at least 3 characters'
        }
        

        if (postData.review.length == 0){
            errors.review = 'Review cannot be empty'
        }
        else if (postData.review.length < 3){
            errors.review = 'Review must be at least 3 characters'
        }

        var count = 0
        for (key in errors){
            count++
        }

        errors.count = count
        return errors

    },

    validateAddReview : function(postData){
        var errors = {}
        if (postData.name.length == 0){
            errors.name = 'Name cannot be empty'
        }
        else if (postData.name.length < 3) {
            errors.name = 'Name must be greater than 3 characters'
        }

        
        if (!postData.stars){
            errors.stars = 'Stars cannot be empty'
        }

        if (postData.review.length == 0){
            errors.review = 'Review cannot be empty'
        }
        else if (postData.review.length < 3){
            errors.review = 'Review must be at least 3 characters'
        }


        var count = 0
        for (key in errors){
            count++
        }

        errors.count = count
        return errors
    }
}