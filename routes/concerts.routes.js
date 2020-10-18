const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuid = require('uuid');

router.route('/concerts').get((req, res, next) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res, next) => {
    const id = req.params.id;
    if (id === 'concert') {
        id = Math.floor(Math.random() * db.concerts.length);
    } else {
        const result = db.concerts.filter(position => {
            return position.id == id;
        });

        res.json(result);
    }
});

router.route('/concerts').post((req, res, next) => {
    randomId = uuid.v4();
    db.concerts.push({
        id: randomId,
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image,
    });
    res.json({ message: "OK" });
});

router.route('/concerts/:id').put((req, res, next) => {
    const id = req.params.id;
    db.concerts.map(position => {
        if (position.id === id) {
            position.performer = req.body.performer;
            position.genre = req.body.genre;
            position.price = req.body.price;
            position.day = req.body.day;
            position.image = req.body.image;
        }
        return position;
    });

    res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res, next) => {
    const id = req.params.id;
    const result = db.concerts.filter(position => {
        return position.id != id;
    });

    res.json({ message: 'OK' });
});

module.exports = router;