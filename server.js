const express = require('express');
const cors = require('cors');
const testimonials = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  });