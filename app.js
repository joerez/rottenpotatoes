const express = require('express');
const methodOverride = require('method-override')

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));



var exphbs = require('express-handlebars');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))


const reviewSchema = mongoose.Schema({
  title: String,
  description: String,
  movieTitle: String,
  rating: String
})

const Review = mongoose.model('Review', reviewSchema);




app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

/*app.get('/', (req, res) => {
  res.render('home', {msg: 'Hello World!'})
})*/

//mock array of projects

/*let reviews = [
  {title: "Star Wars"},
  {title: "Harry Potter"}
];
*/

//index
app.get('/', (req, res) => {
  Review.find().then((reviews) => {
    res.render('reviews-index', {reviews: reviews});
  }).catch((err) => {
    console.log(err);
  })
})

// NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

// SHOW
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})

// CREATE
app.post('/reviews', (req, res) => {
  let review = new Review(req.body);
  review.save((err,review) => {
    if(err) throw err;
    res.redirect('/reviews/' + review._id);
  })
})

// EDIT
app.get('/reviews/:id/edit', function (req, res) {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})

// UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body).then((review) => {
    res.redirect('/reviews/' + review._id)
  }).catch((err) => {
    console.log(err.message)
  })
})

// DELETE
app.delete('/reviews/:id', function (req, res) {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port 3000!');
})
