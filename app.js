const express = require('express');
const app = express();
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/*app.get('/', (req, res) => {
  res.render('home', {msg: 'Hello World!'})
})*/

//mock array of projects
let reviews = [
  {title: "Star Wars"},
  {title: "Harry Potter"}
];


//index
app.get('/', (req, res) => {
  res.render('reviews-index', {reviews: reviews});
})


app.listen(3000, () => {
  console.log('App listening on port 3000!');
})
