const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuid = require('uuid');

router.route('/seats').get((req, res, next) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res, next) => {
    const id = req.params.id;
    if (id === 'seat') {
        id = Math.floor(Math.random() * db.seats.length);
    } else {
        const result = db.seats.filter(position => {
            return position.id == id;
        });

        res.json(result);
    }
});

router.route('/seats').post((req, res, next) => {
    randomId = uuid.v4();
    db.seats.push({
        id: randomId,
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email,
    });
    res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res, next) => {
    const id = req.params.id;
    db.seats.map(position => {
        if (position.id === id) {
            position.day = req.body.day,
                position.seat = req.body.seat;
            position.client = req.body.client;
            position.email = req.body.email;
        }
        return position;
    });

    res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res, next) => {
    const id = req.params.id;
    const result = db.seats.filter(position => {
        return position.id != id;
    });

    res.json({ message: 'OK' });
});

module.exports = router;