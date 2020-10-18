const express = require('express');
const cors = require('cors');
const { db } = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/testimonials', (req, res, next) => {
    res.json(db);
})

app.get('/testimonials/:id', (req, res, next) => {
    const id = req.params.id;
    if (id === 'testimonial') {
        id = Math.floor(Math.random() * db.length);
    } else {
        const result = db.filter(position => {
            return position.id == id;
        });

        res.json(result);
    }
})

app.get('/testimonials/random', (req, res) => {
    res.render('testimonialsID', { id: req.params.id });

    res.json({message: 'OK'});
});

app.put('/testimonials/:id', (req, res, next) => {
    const id = req.params.id;
    const author = req.body.author;
    const text = req.body.text;
    const result = db.map (position => {
        if (position.id === id) {
            position.author = req.body.author;
            position.text = req.body.text;
        }
        return position;
    });

    res.json({message: 'OK'});
});

app.delete('/testimonials/:id', (req, res, next) => {
    const id = req.params.id;
    const result = db.filter(position => {
        return position.id != id;
    });

    res.json({message: 'OK'});
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.listen(8000, () => {
    console.log('CORS-enabled web server listening on port 8000')
});