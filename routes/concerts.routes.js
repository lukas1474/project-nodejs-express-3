const express = require('express');
const router = express.Router();
// const db = require('./../db');
// const uuid = require('uuid');
const Concert = require('../models/concert.model');

// router.route('/concerts').get((req, res, next) => {
//     res.json(db.concerts);
// });



router.get('/concerts', async (req, res, next) => {
    try {
        res.json(await Concert.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get('/concerts/random', async (req, res) => {

    try {
      const count = await Concert.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const concert = await Concert.findOne().skip(rand);
      if(!concert) res.status(404).json({ message: 'Not found' });
      else res.json(concert);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  });

// router.route('/concerts/:id').get((req, res, next) => {
//     const id = req.params.id;
//     if (id === 'concert') {
//         id = Math.floor(Math.random() * db.concerts.length);
//     } else {
//         const result = db.concerts.filter(position => {
//             return position.id == id;
//         });

//         res.json(result);
//     }
// });

router.get('/concerts/:id', async (req, res, nest) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if (!concert) res.status(404).json({ message: 'Not found' });
        else res.json(concert);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

// router.route('/concerts').post((req, res, next) => {
//     randomId = uuid.v4();
//     db.concerts.push({
//         id: randomId,
//         performer: req.body.performer,
//         genre: req.body.genre,
//         price: req.body.price,
//         day: req.body.day,
//         image: req.body.image,
//     });
//     res.json({ message: "OK" });
// });

router.post('/concerts', async (req, res, next) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concert({
            performer: performer,
            genre: genre,
            price: price,
            day: day,
            image: image,
        });
        await newConcert.save();
        res.json({ message: 'OK' });

    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// router.route('/concerts/:id').put((req, res, next) => {
//     const id = req.params.id;
//     db.concerts.map(position => {
//         if (position.id === id) {
//             position.performer = req.body.performer;
//             position.genre = req.body.genre;
//             position.price = req.body.price;
//             position.day = req.body.day;
//             position.image = req.body.image;
//         }
//         return position;
//     });

//     res.json({ message: 'OK' });
// });

router.put('/concerts', async (req, res, next) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        const concert = await (Concert.findById(req.params.id));
        if (concert) {
            await Concert.updateOne({ _id: req.params.id }, {
                $set: {
                    performer: performer,
                    genre: genre,
                    price: price,
                    day: day,
                    image: image,
                }
            });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

// router.route('/concerts/:id').delete((req, res, next) => {
//     const id = req.params.id;
//     const result = db.concerts.filter(position => {
//         return position.id != id;
//     });
//     db.concerts = result;

//     res.json({ message: 'OK' });
// });

router.delete('/concerts/:id', async (req, res, next) => {
    try {
        const concert = await (Concert.findById(req.params.id));
        if (concert) {
            await Concert.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;
