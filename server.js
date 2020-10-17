const express = require('express');
const cors = require('cors');
const {db} = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/testimonials', (req, res, next) => {
    res.json(db);
  })

app.get('/testimonials/:id', (req, res) => {
    res.render('testimonialsID', {id: req.params.id});
});

app.get('/testimonials/random', (req, res) => {
    res.render('testimonialsID', {id: req.params.id});
});

app.listen(8000, () => {
    console.log('CORS-enabled web server listening on port 8000')
});