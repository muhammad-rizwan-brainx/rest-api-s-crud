const express = require('express');

const userControler = require('../controlers/usersControler');

const Router = express.Router()

Router.post('/signup' , userControler.user_signup);

Router.post('/login', userControler.user_login);

Router.delete('/:userID', userControler.user_delete);

module.exports = Router;