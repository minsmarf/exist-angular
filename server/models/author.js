var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movies', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
console.log('mongo file')


var ReviewSchema = new mongoose.Schema({
    reviewer : String,
    stars : Number,
    review : String,
    createdAt : Date
})
var MovieSchema = new mongoose.Schema({
    title: String,
    averageStars : Number,
    createdAt : Date,
    updatedAt : Date,
    reviews : [ReviewSchema]
})
mongoose.model('Movie', MovieSchema);
mongoose.model('Review', ReviewSchema);

console.log('models file')

module.exports = {
    movie : mongoose.model('Movie'),
    review : mongoose.model('Review')
}
