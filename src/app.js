const express = require('express');
const readerRouter = require('./routes/reader');
const BookRouter = require('./routes/book');

const app = express();

app.use(express.json());
app.use('/readers', readerRouter);
app.use('/books', BookRouter);

/*app.get('/', (req, res) => {
    res.status(200).json('Hello World')
}) */

module.exports = app;
