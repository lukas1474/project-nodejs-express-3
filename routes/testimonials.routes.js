const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuid = require('uuid');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
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
    const min = 0;
    const max = db.testimonials.length - 1;
    const random = Math.floor(Math.random() * (max - min + 1) + min);

    res.json(db.testimonials[random]);
});

router.route('/testimonials').post((req, res) => {
    randomId = uuid.v4();
    db.testimonials.push({
        id: randomId,
        author: req.body.author,
        text: req.body.text
    });
    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
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

router.route('/testimonials/:id').delete((req, res) => {
    const id = req.params.id;
    const result = db.testimonials.filter(position => {
        return position.id != id;
    });
    db.testimonials = result;

    res.json({ message: 'OK' });
});

module.exports = router;