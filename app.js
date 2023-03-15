const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const morgan = require('morgan');

const multer = require('multer');

const bodyParser = require('body-parser');

const memoriesRoutes = require('./api/routes/memories');

const userRoutes = require('./api/routes/users');

const db = mongoose.connect('mongodb+srv://rizsyal:12345@cluster0.1yxhcdy.mongodb.net/?retryWrites=true&w=majority')
if (db) {
    console.log('success');
} else {
    console.log('DB not Connected');
}

const app = express();

app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/memories', memoriesRoutes);
app.use('/users', userRoutes);



app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 400;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;