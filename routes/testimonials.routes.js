const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuid = require('uuid');

router.route('/testimonials').get((req, res, next) => {
    res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res, next) => {
    const id = req.params.id;
    if (id === 'testimonial') {
        id = Math.floor(Math.random() * db.testimonials.length);
    } else {
        const result = db.testimonials.filter(position => {
            return position.id == id;
        });

        res.json(result);
    }
});

router.route('/testimonials/random').get((req, res) => {
    res.render('testimonialsID', { id: req.params.id });

    res.json({ message: 'OK' });
});

router.route('/testimonials').post((req, res, next) => {
    randomId = uuid.v4();
    db.testimonials.push({
        id: randomId,
        author: req.body.author,
        text: req.body.text
    });
    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res, next) => {
    const id = req.params.id;
    db.testimonials.map(position => {
        if (position.id === id) {
            position.author = req.body.author;
            position.text = req.body.text;
        }
        return position;
    });

    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res, next) => {
    const id = req.params.id;
    const result = db.testimonials.filter(position => {
        return position.id != id;
    });

    res.json({ message: 'OK' });
});

module.exports = router;